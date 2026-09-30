import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, checkRateLimit, recordLoginAttempt, COOKIE_NAME } from "@/lib/admin/auth-utils";
import { addActivityLog } from "@/lib/admin/storage";

export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // 1. Check Rate Limit
    let rateCheck: { allowed: boolean; remainingMs?: number } = { allowed: true, remainingMs: 0 };
    try {
      rateCheck = await checkRateLimit(clientIp);
    } catch (e) {
      console.error("Rate check failed, allowing request:", e);
    }

    if (!rateCheck.allowed) {
      const minutes = Math.ceil((rateCheck.remainingMs || 0) / (60 * 1000));
      return NextResponse.json(
        { error: `Too many failed login attempts. Account locked for ${minutes} minutes.` },
        { status: 429 }
      );
    }

    // 2. Parse Body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in login request." },
        { status: 400 }
      );
    }

    const { username, password } = body || {};

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    // 3. Authenticate
    const authResult = await authenticateAdmin(username, password);

    if (!authResult.success || !authResult.sessionToken) {
      try {
        await recordLoginAttempt(clientIp, false);
        await addActivityLog("AUTH", `Failed admin login attempt from IP ${clientIp}`, username, "Invalid credentials");
      } catch (logErr) {
        console.error("Non-critical logging error during failed login:", logErr);
      }
      return NextResponse.json(
        { error: authResult.error || "Invalid username or password." },
        { status: 401 }
      );
    }

    try {
      await recordLoginAttempt(clientIp, true);
      await addActivityLog("AUTH", "Successful admin login", username, `IP ${clientIp}`);
    } catch (logErr) {
      console.error("Non-critical logging error during successful login:", logErr);
    }

    // 4. Response with HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      user: { username: "FashAIadmin" },
      token: authResult.sessionToken,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: authResult.sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400, // 24 hrs
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred during login." },
      { status: 500 }
    );
  }
}

