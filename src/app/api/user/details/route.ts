import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Cookies from "js-cookie";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();

    try {
        const body = await req.json();
        const id = body?.data?.id;

        console.log("Request body:", body);
        console.log("ID:", id, "Type:", typeof id);
        // Validate input
        if (!id || typeof id !== "number") {
            return NextResponse.json({ message: "Invalid input" }, { status: 400 });
        }

        // Query the database
        const response = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                userName: true,
                currBal: true,
            },
        });

        if (!response) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Error fetching user details:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { message: "Internal server error", error: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { message: "Internal server error", error: "Unknown error" },
                { status: 500 }
            );
        }
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    //const test = await prisma.transaction.findFirst();
    //console.log("Database Connection Test:", test);

    try {
        const id = Number(req.cookies.get("userID")?.value);
        console.log("ID:", id);
        //console.log("ConID:", contactId);
        //console.log("ID type: ", typeof id);
        // Validate the payload
        if (!id || typeof id !== "number" || id <= 0) {
            //console.log(!id, typeof id !== "number", id <= 0);
            return NextResponse.json(
                { message: "Invalid payload: 'id' must be a positive number" },
                { status: 400 }
            );
        }

        // Fetch user transactions
        const userTransactions = await prisma.transaction.findMany({
            where: {
                OR: [
                    { sender_id: id },
                    { receiver_id: id }
                ]
            },
            select: {
                trans_id: true,
                sender_id: true,
                receiver_id: true,
                amount: true,
                type: true,
                trans_date: true, // Explicitly select the date field
              },
        });

        // Return the transactions
        console.log("User transactions:", userTransactions);
        return NextResponse.json({ userTransactions }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching transactions" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
