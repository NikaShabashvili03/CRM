import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    name,
    stage,
    userId,
    phone,
    creator,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const allTasks = await prisma.tasks.create({
    data: {
      name: name,
      stage: stage,
      status: 'none',
      phone: phone,
      userId: userId,
      creator: creator,
    },
  })

  return NextResponse.json(allTasks);
}


