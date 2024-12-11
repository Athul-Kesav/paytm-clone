import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { TransactionSchema } from "@/validation/TransactionSchema";


export async function PUT(req: NextRequest) {

    const prisma = new PrismaClient();
    //const test = await prisma.transaction.findFirst();
    //console.log("Database Connection Test:", test);

    try {
        const body = await req.json();
        //console.log("Request body:", body);
        const { id, contactId } = body.data;
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

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();

    try {
        // Parse and validate body
        const body = await req.json();
        if (
            !body ||
            typeof body.id !== "number" ||
            typeof body.amount !== "number" ||
            typeof body.contactId !== "number" ||
            typeof body.pin !== "number"
        ) {
            return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
        }


        const { id, amount, contactId, pin } = body;

        if (!id || !amount || !contactId || !pin) {
            return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
        }

        // Fetch user
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user || user.pin !== pin) {
            return NextResponse.json({ message: "Incorrect PIN" }, { status: 403 });
        }

        // Fetch recipient
        const recipient = await prisma.user.findUnique({ where: { id: contactId } });
        if (!recipient) {
            return NextResponse.json({ message: "Recipient not found" }, { status: 404 });
        }

        console.log("Request body:", body);
        console.log("User:", user);
        console.log("Recipient:", recipient);

        // Check balance
        if (user.currBal < amount) {
            return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
        }

        const newTransaction = {
            user_id: id,
            receiver_id: contactId,
            amount,
        }

        const parsedTransaction = TransactionSchema.safeParse(newTransaction);
        console.log("Parsed transaction successful:", parsedTransaction.success);
        console.log("New transaction:", newTransaction);


        // Perform transaction
        console.log("Performing transaction");
        const result = await prisma.$transaction([

            prisma.user.update({
                where: { id },
                data: { currBal: { decrement: amount } },
            }),

            prisma.user.update({
                where: { id: contactId },
                data: { currBal: { increment: amount } },
            }),



            prisma.transaction.create({
                data: {
                    sender: {
                        connect: { id: id }
                    },
                    receiver: {
                        connect: { id: contactId }
                    },
                    amount: amount,
                    type: "transfer",
                },
            }),
        ]);
        console.log("Transaction complete");

        return NextResponse.json({ message: "Transaction successful" }, { status: 200 });
    } catch (error) {
        console.error("Transaction Error:", error);
        return NextResponse.json(
            { message: "An error occurred during the transaction" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
