import { NextResponse } from 'next/server';

export function POST() {
    // Remove the token cookie
    const response = NextResponse.json({ message: "User signed out successfully." });

    response.cookies.set("token", "", {
        httpOnly: true, // The cookie will not be accessible via JavaScript
        path: "/",      // Set the path to the root, which matches the path of the cookie
        maxAge: 0,      // Set maxAge to 0 to immediately expire the cookie
        sameSite: "strict", // Helps with CSRF protection
    });
    
    return response;
}