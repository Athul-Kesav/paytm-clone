import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { SignupSchema } from "@/validation/SignupSchema";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, password, userName } = body;

    // Validate the body using Zod schema
    const valid = SignupSchema.safeParse(body);
    if (!valid.success) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email is already in use." }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
        currBal: 0,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Set the cookie in the response
    const response = NextResponse.json({
      message: "User created successfully.",
      token: token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set("username", JSON.stringify(newUser.userName) , {
      httpOnly: false,
      path: "/", // Root path
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict", // CSRF protection
  })

  response.cookies.set("userID", JSON.stringify(newUser.id) , {
      httpOnly: false,
      path: "/", // Root path
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict", // CSRF protection
  })

  response.cookies.set("balance", JSON.stringify(newUser.currBal) , {
      httpOnly: false,
  })

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
