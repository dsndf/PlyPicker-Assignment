import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const checkAuthorizeRoute = async (role: "admin" | "team-member") => {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== role) redirect("/");
};
