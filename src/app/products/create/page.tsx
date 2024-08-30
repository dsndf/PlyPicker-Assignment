import CreateProduct from "@/app/_components/CreateProduct";
import { checkAuthorizeRoute } from "@/lib/checkAdminRoute";
import React from "react";

const CreateProductPage = async () => {
  await checkAuthorizeRoute("admin");
  return (
    <div className="p-6">
      <h3 className="text-xl">CREATE PRODUCT</h3>
      <CreateProduct />
    </div>
  );
};

export default CreateProductPage;
