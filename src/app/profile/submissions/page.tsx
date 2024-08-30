import SubmissionsTable from "@/app/_components/Table/SubmissionsTable";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const SubmissionsPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "team-member") redirect("/");
  return (
    <div className="p-6">
      <h3 className="text-2xl mb-2">SUBMISSIONS</h3>
      <SubmissionsTable />
    </div>
  );
};

export default SubmissionsPage;
