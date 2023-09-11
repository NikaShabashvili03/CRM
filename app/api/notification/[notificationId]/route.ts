import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    notificationId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { notificationId } = params;

  if (!notificationId || typeof notificationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const notification = await prisma.notifications.deleteMany({
    where: {
      id: notificationId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(notification);
}
