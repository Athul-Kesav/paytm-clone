import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

// Define your secret key
const SECRET_KEY = process.env.JWT_SECRET as Secret;

export async function middleware(req: NextRequest) {
  console.log("Middleware executed");
  try {
    // Extract the token from cookies or authorization header
    const token = req.cookies.get("token")?.value;
    // Check if token exists
    if (!token) {
        NextResponse.json({ error: "Token not found" }, { status: 401 });
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Verify the token
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next(); // Token is valid, continue to the requested route
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if invalid
  }
}

// Specify the paths where this middleware should apply
export const config = {
  matcher: [
    "/api*", // Match all routes starting with /api/path
    "/api/user/:path*", // Match all routes starting with /api/user
    "!/api/user/login", // Exclude /api/user/login
    "!/api/user/signup", // Exclude /api/user/signup
    "!/api/user/logout", // Exclude /api/user/logout
  ],
};
