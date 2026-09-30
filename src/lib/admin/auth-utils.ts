import crypto from "crypto";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const AUTH_FILE = path.join(DATA_DIR, "admin-auth.json");

const COOKIE_NAME = "fashai_admin_session";
const DEFAULT_USER = process.env.ADMIN_USER || "FashAIadmin";
const DEFAULT_PASS = process.env.ADMIN_PASS || "AdminAsFashAI@2026!";
const JWT_SECRET = process.env.ADMIN_SECRET || process.env.NEXTAUTH_SECRET || "FashAI_Universal_Admin_Secret_2026_Key!";

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

function base64UrlEncode(str: string): string {
  return Buffer.from(str).toString("base64url");
}

function base64UrlDecode(str: string): string {
  return Buffer.from(str, "base64url").toString("utf8");
}

// Generate stateless HMAC-signed session token (works across serverless lambdas and Vercel deployments)
function createStatelessSessionToken(username: string): string {
  const payload = JSON.stringify({
    u: username,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    iat: Date.now(),
  });
  const encodedPayload = base64UrlEncode(payload);
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

// Verify stateless HMAC-signed session token
function verifyStatelessToken(token: string): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, signature] = parts;
  try {
    const expectedSig = crypto.createHmac("sha256", JWT_SECRET).update(encodedPayload).digest("base64url");
    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSig);

    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return false;
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (!payload.exp || Date.now() > payload.exp) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

async function getAuthStore(): Promise<AuthStore> {
  try {
    const raw = await fs.readFile(AUTH_FILE, "utf-8");
    const store: AuthStore = JSON.parse(raw);
    if (!store.activeSessions) store.activeSessions = {};
    if (!store.loginAttempts) store.loginAttempts = {};
    if (!store.username) store.username = DEFAULT_USER;
    return store;
  } catch {
    const salt = "static_fashai_salt_2026";
    const passwordHash = hashPassword(DEFAULT_PASS, salt);
    return {
      username: DEFAULT_USER,
      passwordHash,
      salt,
      activeSessions: {},
      loginAttempts: {},
    };
  }
}

async function saveAuthStore(store: AuthStore) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(AUTH_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    // Non-fatal on serverless platforms like Vercel
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
  } catch {
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
        current.lockUntil = now + 15 * 60 * 1000;
      }
      store.loginAttempts[ip] = current;
    }
    await saveAuthStore(store);
  } catch {
    // Non-fatal on serverless
  }
}

export async function authenticateAdmin(
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; sessionToken?: string; error?: string }> {
  try {
    const normalizedInput = (usernameInput || "").trim().toLowerCase();
    const normalizedDefaultUser = (DEFAULT_USER || "").trim().toLowerCase();

    // Support case-insensitivity and common typo variations like FashAladmin or admin
    const isUsernameMatch =
      normalizedInput === normalizedDefaultUser ||
      normalizedInput === "fashaladmin" ||
      normalizedInput === "fashaiadmin" ||
      normalizedInput === "admin";

    if (!isUsernameMatch) {
      return { success: false, error: "Invalid admin credentials" };
    }

    // Direct password match check against DEFAULT_PASS / process.env.ADMIN_PASS
    const isDirectMatch =
      passwordInput === DEFAULT_PASS ||
      (process.env.ADMIN_PASS && passwordInput === process.env.ADMIN_PASS);

    let isHashMatch = false;

    try {
      const store = await getAuthStore();
      if (store.passwordHash && store.salt) {
        const computed = hashPassword(passwordInput, store.salt);
        const buf1 = Buffer.from(computed);
        const buf2 = Buffer.from(store.passwordHash);
        if (buf1.length === buf2.length && crypto.timingSafeEqual(buf1, buf2)) {
          isHashMatch = true;
        }
      }
    } catch {
      // Ignore read errors
    }

    if (!isDirectMatch && !isHashMatch) {
      return { success: false, error: "Invalid admin credentials" };
    }

    // Generate stateless token (verified by HMAC key across all Vercel serverless lambdas)
    const sessionToken = createStatelessSessionToken(usernameInput);

    // Save to auth store if filesystem is writable
    try {
      const store = await getAuthStore();
      store.activeSessions[sessionToken] = {
        username: usernameInput,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        createdAt: new Date().toISOString(),
      };
      await saveAuthStore(store);
    } catch {
      // Ignore write errors on serverless
    }

    return { success: true, sessionToken };
  } catch (err) {
    console.error("authenticateAdmin error:", err);
    return { success: false, error: "Authentication system error" };
  }
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  // 1. Primary: Try stateless token verification
  if (verifyStatelessToken(token)) {
    return true;
  }

  // 2. Fallback: Check local auth store file if legacy token
  try {
    const store = await getAuthStore();
    const session = store.activeSessions ? store.activeSessions[token] : undefined;
    if (session && Date.now() <= session.expiresAt) {
      return true;
    }
  } catch {
    // Ignore store read error
  }

  return false;
}

export async function invalidateSession(token: string | undefined) {
  if (!token) return;
  try {
    const store = await getAuthStore();
    if (store.activeSessions && store.activeSessions[token]) {
      delete store.activeSessions[token];
      await saveAuthStore(store);
    }
  } catch {
    // Ignore write error
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
