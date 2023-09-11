import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {

  const body = await request.json();
  const { 
    avatar,
    firstName,
    lastName,
    password,
    role,
    phoneNumber,
    email,
   } = body;


   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      avatar,
      firstName,
      lastName,
      role, 
      phoneNumber,
      hashedPassword,
      email
    }
  });

  return NextResponse.json(user);
}
