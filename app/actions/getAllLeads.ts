
import prisma from "@/app/libs/prismadb";

export interface IRoomsParams {
  status: any,
}
 
export default async function getAllLeads(
  params: IRoomsParams
) {
  try {
    const {
      status
    } = params;


    const AllLeads = await prisma.tasks.findMany({
      where: {
        status: status,
      },
      include: {
        user: true,
        activity: true,
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