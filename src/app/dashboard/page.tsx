import React, { Suspense } from "react";
import Products from "../_components/Products";
import { Spinner } from "@nextui-org/react";

const Dashboard = () => {
  return (
    <div className="p-4  flex justify-center  ">
      <Suspense
        fallback={
          <Spinner label="Loading products..." color="primary" labelColor="primary" />
        }
      >
        <Products />
      </Suspense>
    </div>
  );
};

export default Dashboard;
