import { NextResponse } from "next/server";


import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams {
    profileId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { profileId } = params;

  if (!profileId || typeof profileId !== 'string') {
    throw new Error('Invalid ID');
  }

  const allTasks = await prisma.user.delete({
    where: {
      id: profileId,
    },
  })

  return NextResponse.json(allTasks);
}


