import { User } from "@/prisma/generated/client/index";


export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};
