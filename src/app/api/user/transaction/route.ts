import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function POST(req: NextRequest, res: NextResponse) {

    
    const prisma = new PrismaClient();

    const {id, amount, contactId, pin} = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            id,
            pin
        }
    });

    const recepient = await prisma.user.findUnique({
        where: {
            id: contactId
        }
    });

    if(!user) {
        return NextResponse.json({message: "Incorrect pin"}, {status: 403});
    }

    if(!recepient) {
        return NextResponse.json({message: "Recepient not found"}, {status: 404});
    }

    if(user.currBal < amount) {
        return NextResponse.json({message: "Insufficient balance"}, {status: 400});
    }

    await prisma.user.update({
        where: {
            id,
            pin
        },
        data: {
            currBal: {
                decrement: amount
            }
        }
    });


    await prisma.user.update({
        where: {
            id: contactId
        },
        data: {
            currBal: {
                increment: amount
            }
        }
    });

    return Response.json({message: "Transaction successful"}, {status: 200});

}