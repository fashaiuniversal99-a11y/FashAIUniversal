import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const AUTH_FILE = path.join(DATA_DIR, "admin-auth.json");

const COOKIE_NAME = "fashai_admin_session";
const DEFAULT_USER = process.env.ADMIN_USER || "FashAIadmin";
const DEFAULT_PASS = process.env.ADMIN_PASS || "AdminAsFashAI@2026!";

interface AuthStore {
  username: string;
  passwordHash: string;
  salt: string;
  activeSessions: Record<string, { username: string; expiresAt: number; createdAt: string }>;
  loginAttempts: Record<string, { count: number; lockUntil: number }>;
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

async function getAuthStore(): Promise<AuthStore> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(AUTH_FILE, "utf-8");
    const store: AuthStore = JSON.parse(raw);
    if (!store.activeSessions) store.activeSessions = {};
    if (!store.loginAttempts) store.loginAttempts = {};
    if (!store.username) store.username = DEFAULT_USER;
    if (!store.passwordHash || !store.salt) {
      const salt = crypto.randomBytes(16).toString("hex");
      store.salt = salt;
      store.passwordHash = hashPassword(DEFAULT_PASS, salt);
      await saveAuthStore(store);
    }
    return store;
  } catch {
    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = hashPassword(DEFAULT_PASS, salt);
    const store: AuthStore = {
      username: DEFAULT_USER,
      passwordHash,
      salt,
      activeSessions: {},
      loginAttempts: {},
    };
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(AUTH_FILE, JSON.stringify(store, null, 2), "utf-8");
    } catch (e) {
      console.error("Error writing auth file:", e);
    }
    return store;
  }
}

async function saveAuthStore(store: AuthStore) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(AUTH_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving auth store:", err);
  }
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remainingMs?: number }> {
  try {
    const store = await getAuthStore();
    const attempt = store.loginAttempts ? store.loginAttempts[ip] : undefined;
    const now = Date.now();

    if (attempt && attempt.lockUntil > now) {
      return { allowed: false, remainingMs: attempt.lockUntil - now };
    }
    return { allowed: true };
  } catch (err) {
    console.error("Rate limit check error:", err);
    return { allowed: true };
  }
}

export async function recordLoginAttempt(ip: string, success: boolean) {
  try {
    const store = await getAuthStore();
    const now = Date.now();
    if (!store.loginAttempts) store.loginAttempts = {};

    if (success) {
      delete store.loginAttempts[ip];
    } else {
      const current = store.loginAttempts[ip] || { count: 0, lockUntil: 0 };
      current.count += 1;
      if (current.count >= 5) {
        current.lockUntil = now + 15 * 60 * 1000; // 15 min lock out
      }
      store.loginAttempts[ip] = current;
    }
    await saveAuthStore(store);
  } catch (err) {
    console.error("Error recording login attempt:", err);
  }
}

export async function authenticateAdmin(usernameInput: string, passwordInput: string): Promise<{ success: boolean; sessionToken?: string; error?: string }> {
  try {
    const store = await getAuthStore();

    const normalizedInput = (usernameInput || "").trim().toLowerCase();
    const normalizedStoreUser = (store.username || "").trim().toLowerCase();

    // Support case-insensitivity and common typo variations like FashAladmin (lowercase l vs capital I) or admin
    const isUsernameMatch =
      normalizedInput === normalizedStoreUser ||
      normalizedInput === "fashaladmin" ||
      normalizedInput === "fashaiadmin" ||
      normalizedInput === "admin";

    if (!isUsernameMatch) {
      return { success: false, error: "Invalid admin credentials" };
    }

    const computed = hashPassword(passwordInput, store.salt);
    const buf1 = Buffer.from(computed);
    const buf2 = Buffer.from(store.passwordHash || "");

    const isValid = buf1.length === buf2.length && crypto.timingSafeEqual(buf1, buf2);

    if (!isValid) {
      return { success: false, error: "Invalid admin credentials" };
    }

    if (!store.activeSessions) {
      store.activeSessions = {};
    }

    // Create session
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours session
    store.activeSessions[sessionToken] = {
      username: store.username,
      expiresAt,
      createdAt: new Date().toISOString(),
    };

    await saveAuthStore(store);
    return { success: true, sessionToken };
  } catch (err) {
    console.error("authenticateAdmin error:", err);
    return { success: false, error: "Authentication system error" };
  }
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const store = await getAuthStore();
    const session = store.activeSessions ? store.activeSessions[token] : undefined;
    if (!session) return false;

    if (Date.now() > session.expiresAt) {
      delete store.activeSessions[token];
      await saveAuthStore(store);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function invalidateSession(token: string | undefined) {
  if (!token) return;
  try {
    const store = await getAuthStore();
    if (store.activeSessions && store.activeSessions[token]) {
      delete store.activeSessions[token];
      await saveAuthStore(store);
    }
  } catch (err) {
    console.error("Error invalidating session:", err);
  }
}

export async function isRequestAuthenticated(request: NextRequest): Promise<boolean> {
  const tokenFromCookie = request.cookies.get(COOKIE_NAME)?.value;
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  const token = tokenFromCookie || tokenFromHeader;
  return verifyAdminSessionToken(token);
}

export { COOKIE_NAME };

