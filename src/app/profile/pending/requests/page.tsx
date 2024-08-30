import PendingReviewsTable from "@/app/_components/Table/PendingReviewsTable";
import { checkAuthorizeRoute } from "@/lib/checkAdminRoute";
import React from "react";

const PendingRequests = async () => {
  await checkAuthorizeRoute("admin");
  return (
    <div className="p-6">
      <h3 className="text-xl mb-2">PENDING REVIEWS</h3>
      <PendingReviewsTable/>
    </div>
  );
};

export default PendingRequests;
