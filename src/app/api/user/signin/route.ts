import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { SigninSchema } from "@/validation/SigninSchema";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { email, password } = body;

        // Validate the body using Zod schema
        const valid = SigninSchema.safeParse(body);
        if (!valid.success) {
            return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // Compare the password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return NextResponse.json({ error: "Invalid password." }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        // Set the cookie in the response
        const response = NextResponse.json({
            message: "User signed in successfully.",
            token: token,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/", // Root path
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: "strict", // CSRF protection
        })

        response.cookies.set("username", JSON.stringify(user.userName) , {
            httpOnly: false,
            path: "/", // Root path
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: "strict", // CSRF protection
        })

        response.cookies.set("userID", JSON.stringify(user.id) , {
            httpOnly: false,
            path: "/", // Root path
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: "strict", // CSRF protection
        })

        response.cookies.set("balance", JSON.stringify(user.currBal) , {
            httpOnly: false,
        })

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}