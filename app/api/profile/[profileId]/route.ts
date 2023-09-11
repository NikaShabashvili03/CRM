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
  const body = await request.json();
  const { 
    firstName,
    lastName,
    phoneNumber,
    role,
    email,
    avatar,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  if (!profileId || typeof profileId !== 'string') {
    throw new Error('Invalid ID');
  }

  const allTasks = await prisma.user.updateMany({
    where: {
      id: profileId,
    },
    data: {
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      role: role,
      email: email,
      avatar: avatar,
    },
  })

  return NextResponse.json(allTasks);
}


