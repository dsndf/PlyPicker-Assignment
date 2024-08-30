"use server";
import { userCollection } from "@/models/User";
import { connectDatabase } from "@/db/connectDb";
import { ErrorHandler } from "@/utils/errorHandler";


type RegisterUserParam = {
  email: string;
  password: string;
};

export const registerUser = async (user: RegisterUserParam) => {
  await connectDatabase();
  const isUser = await userCollection.findOne({ email: user.email });
  if (isUser) throw new ErrorHandler("Account already exists", 409);
  await userCollection.create(user);
};

