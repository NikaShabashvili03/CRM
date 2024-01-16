import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IRoomsParams {
  status: any,
}

export default async function getLeads(
  params: IRoomsParams
) {
  try {
    const {
      status
    } = params;
    
    let query: any = {};
    const currentUser = await getCurrentUser();

    const AllLeads = await prisma.tasks.findMany({
      where: {
        userId: currentUser?.id,
        status: status,
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true,
      }
    });

    const safeAllLeads = AllLeads.map((leads: any) => ({
      ...leads,
      createdAt: leads.createdAt.toISOString(),
    }));

    return safeAllLeads;
  } catch (error: any) {
    throw new Error(error);
  }
}
