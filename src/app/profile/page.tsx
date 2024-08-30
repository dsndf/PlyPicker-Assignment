import { getServerSession } from "next-auth";
import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;
  const buttonHref =
    role === "admin" ? "/profile/pending/requests" : "/profile/submissions";
  const buttonText =
    role === "admin" ? "View Pending Reviews" : "View Submissions";
  const buttonColor = role === "admin" ? "secondary" : "primary";
  return (
    <div className="p-6">
      <h3 className="text-2xl">PROFILE</h3>
      <div className="mt-2 flex justify-start gap-10">
        <div>
          <p>Email</p>
          <p>Role</p>
        </div>
        <div>
          <p>{session?.user.email}</p>
          <p>{session?.user.role}</p>
          <Button
            as={Link}
            href={buttonHref}
            className="my-2"
            color={buttonColor}
          >
            {buttonText}
          </Button>
          <div>
            {role === "admin" && (
              <Button as={Link} href="/products/create" color="primary">
                Create Product
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
