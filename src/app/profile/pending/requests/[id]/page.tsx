import PendingRequestDetails from "@/app/_components/PendingRequestDetails";
import { checkAuthorizeRoute } from "@/lib/checkAdminRoute";
import { Spinner } from "@nextui-org/react";
import React, { Suspense } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pending Review",
  description: "Generated by create next app",
};

type Props = {
  params: {
    id: string;
  };
};

const PendingRequestPage = async ({ params: { id } }: Props) => {
  await checkAuthorizeRoute("admin");
  return (
    <div className="p-6 flex flex-col justify-center">
      <h3 className="text-xl mb-2">COMPARE CHANGES</h3>
      <Suspense
        fallback={
          <Spinner
            label="Loading changes..."
            color="primary"
            labelColor="primary"
          />
        }
      >
        <PendingRequestDetails id={id} />
      </Suspense>
    </div>
  );
};

export default PendingRequestPage;
