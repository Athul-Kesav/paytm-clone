
import { PrismaClient } from "@prisma/client";



export async function GET() {

    const prisma = new PrismaClient();

    try {
        const data = await prisma.user.findMany({
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