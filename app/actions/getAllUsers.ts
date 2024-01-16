import prisma from "@/app/libs/prismadb";


export default async function getAllUser() {
  try {
    const allUser = await prisma.user.findMany({
      include: {
        tasks: {
          include: {
            user: true,
            activity: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    
    const safeAllUsers = allUser.map((user: any) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
    }));

    return safeAllUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}
