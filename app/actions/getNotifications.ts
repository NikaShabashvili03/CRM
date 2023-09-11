import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IRoomsParams {
}

export default async function getNotifications(
) {
  try {
    const currentUser = await getCurrentUser();

    const AllNotifications = await prisma.notifications.findMany({
      where: {
        userId: currentUser?.id,
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true,
        task: {
          include: {
            user: true,
            activity: true,
          }
        },
      }
    });

    const safeAllNotifications = AllNotifications.map((leads) => ({
      ...leads,
      createdAt: leads.createdAt.toISOString(),
    }));

    return safeAllNotifications;
  } catch (error: any) {
    throw new Error(error);
  }
}
