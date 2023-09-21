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
    title,
    logo,
    message,
    creator,
    userId,
    taskId,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const allNotifications = await prisma.notifications.create({
    data: {
      title: title,
      logo: logo,
      message: message,
      creator: creator,
      userId: userId,
      taskId: taskId,
    },
  })

  return NextResponse.json(allNotifications);
}


