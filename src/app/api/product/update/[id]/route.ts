import { connectDatabase } from "@/db/connectDb";
import { productCollection } from "@/models/Product";
import { ErrorHandler } from "@/utils/errorHandler";
import { errorResponse } from "@/utils/errorResponse";
import { NextResponse } from "next/server";

type ParamsType = {
  params: {
    id: string;
  };
};
export async function PUT(req: Request, { params: { id } }: ParamsType) {
  console.log("Reached");
  try {
    await connectDatabase();
    const data = await req.json();
    const product = await productCollection.findById(id);
    if (!product)
      return errorResponse(new ErrorHandler("Product Not Found", 404));
    const updatedProduct = await productCollection.findByIdAndUpdate(id, data,{new:true});
    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      updatedProduct
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
