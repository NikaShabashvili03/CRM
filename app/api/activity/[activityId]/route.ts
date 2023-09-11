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
  const body = await request.json();
  const { 
    lost,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  if (!activityId || typeof activityId !== 'string') {
    throw new Error('Invalid ID');
  }

  const allTasks = await prisma.activity.updateMany({
    where: {
      id: activityId,
    },
    data: {
      lostActivity: lost,
    },
  })

  return NextResponse.json(allTasks);
}


