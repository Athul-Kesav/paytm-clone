import { PrismaClient } from "@prisma/client";
import { userAgent } from "next/server";

export async function GET(){

    const prisma = new PrismaClient();

    const response = await prisma.user.update({
        where:{
            id:13
        },
        data:{
            currBal:100000
        }
    })

    return Response.json(response);


}