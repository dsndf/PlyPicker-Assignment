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
export async function GET(req: Request, { params: { id } }: ParamsType) {
  console.log("Reached");
  try {
    await connectDatabase();
    const product = await productCollection.findById(id);
    if (!product)
      return errorResponse(new ErrorHandler("Product Not Found", 404));
    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
