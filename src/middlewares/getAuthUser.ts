import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JWT_SECRET } from "@/config/settings";
import { ErrorHandler } from "@/utils/errorHandler";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const getAuthUser = async (
  req: NextRequest,
  role: "admin" | "team-member" = "team-member"
) => {
  const token = await getToken({ req, secret: JWT_SECRET });
  if (!token?.user) throw new ErrorHandler("Please login", 401);
  if (role === "admin" && token.user.role !== "admin")
    throw new ErrorHandler("Only admins are allowed", 401);
  return token.user;
};
