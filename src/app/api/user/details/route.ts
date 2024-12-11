import { PrismaClient } from "@prisma/client";
import { NextRequest} from "next/server";

export async function POST(req: NextRequest) {

    const prisma = new PrismaClient();

    const body = await req.json();
    const id = body.data.id;

    const response = await prisma.user.findUnique({
        where:{
            id:id
        },
        select:{
            id:true,
            userName:true,
            currBal:true
        }
    });

    return Response.json(response);


}