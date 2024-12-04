import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export function GET() {
    console.log("GET request to /api/signup.");
    return Response.json({
      message: "This is the signup route.",
    });
  }

  
export async function POST(req: NextRequest, res: NextResponse) {
    console.log("POST request to /api/signup.");
    try {
      const body = await req.json();
      console.log(body);
      const {email, password, userName} = body;

      // Check if the email is already in use
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json({ error: "Email is already in use." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          userName,
          currBal:0,
        },
      });

      return NextResponse.json({ message: "User created successfully.", user: newUser });
    } catch (error) {
      console.error(error);
      
      return NextResponse.json({ error: "Internal server error." });
    } finally {
      await prisma.$disconnect(); // Ensure the Prisma Client is properly closed
    }
  }

