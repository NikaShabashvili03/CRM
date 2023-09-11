import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams {
    activityId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { activityId } = params;

  if (!activityId || typeof activityId !== 'string') {
    throw new Error('Invalid ID');
  }

  const allTasks = await prisma.activity.delete({
    where: {
      id: activityId,
    },
  })

  return NextResponse.json(allTasks);
}


