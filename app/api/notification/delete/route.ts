import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function DELETE() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }


  const notification = await prisma.notifications.deleteMany({
    where: {
      userId: currentUser.id
    }
  });

  return NextResponse.json(notification);
}
