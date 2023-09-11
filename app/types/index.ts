import { AllRooms, User } from "@prisma/client";


export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};


export type SafeRooms = Omit<
  AllRooms,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};