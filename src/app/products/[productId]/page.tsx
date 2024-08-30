import { Product } from "@/app/_components/ProductCard";
import ProductDetailForm from "@/app/_components/ProductDetailForm";
import { BASE_URL } from "@/config/settings";
import { connectDatabase } from "@/db/connectDb";
import { productCollection } from "@/models/Product";
import { ErrorHandler } from "@/utils/errorHandler";
import React from "react";

type Props = {
  params: {
    productId: string;
  };
};

const ProductDetailsPage = async ({ params: { productId } }: Props) => {
  await connectDatabase();
  const data = await productCollection.findById(productId);
  if (!data) throw new ErrorHandler("Product not found", 404);
  const product: Product = {
    productName: data?.productName!,
    productDescription: data?.productDescription!,
    productImage: data?.productImage!,
    productPrice: data?.productPrice!,
    _id: String(data._id),
    admin: String(data.admin),
  };
  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl  border-red-500">Product Details</h1>
      <ProductDetailForm initialProductDetails={product} />
    </div>
  );
};

export default ProductDetailsPage;
