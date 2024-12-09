import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import Cookies from "js-cookie";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();

    try {
        // Assuming you have a way to get the current user's ID or username
        
        const currentUser = await req.json()// Default to NaN if userId is not defined or cannot be parsed
        //console.log(currentUser.data.id);
        const currentUserID = parseInt(currentUser.data.id);
        if (!currentUser) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        const data = await prisma.user.findMany({
            where: {
                NOT: {
                    id: currentUserID  // Filter out the current user
                }
            },
            select: {
                id: true,
                userName: true
            }
        });

        return Response.json(data);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}
