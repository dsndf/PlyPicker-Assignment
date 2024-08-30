import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";

export const checkAuthorizeRoute = async (role: "admin" | "team-member") => {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== role) redirect("/");
};
