import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams {
  leadsId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { leadsId } = params;
  const body = await request.json();
  const { 
    status,
    deadline,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  if (!leadsId || typeof leadsId !== 'string') {
    throw new Error('Invalid ID');
  }

  const allTasks = await prisma.tasks.updateMany({
    where: {
      id: leadsId,
    },
    data: {
      status: status,
      deadline: deadline,
    },
  })

  return NextResponse.json(allTasks);
}


