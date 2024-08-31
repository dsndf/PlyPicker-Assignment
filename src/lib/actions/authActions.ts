"use server";
import { userCollection } from "@/models/User";
import { connectDatabase } from "@/db/connectDb";
import { createServerAction, ServerActionError } from "./actions-utils";

type RegisterUserParam = {
  email: string;
  password: string;
};

export const registerUser = createServerAction(
  async (user: RegisterUserParam) => {
    console.log("SERVER ACTION");
    await connectDatabase();
    const isUser = await userCollection.findOne({ email: user.email });
    console.log({ isUser });
    if (isUser) throw new ServerActionError("Account already Exists");
    await userCollection.create(user);
  }
);
