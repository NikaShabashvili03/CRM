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
    status,
    message,
    taskId,
    deadline,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const allActivity = await prisma.activity.create({
    data: {
      status: status,
      message: message,
      userId: currentUser.id,
      taskId: taskId,
      deadline: deadline,
    },
  })

  return NextResponse.json(allActivity);
}


