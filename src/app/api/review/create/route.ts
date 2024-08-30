
import { connectDatabase } from "@/db/connectDb";
import { getAuthUser } from "@/middlewares/getAuthUser";
import { reviewCollection } from "@/models/Review";
import { ErrorHandler } from "@/utils/errorHandler";
import { errorResponse } from "@/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

type DATA = {
  productId: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productImage: string;
  adminId: string;
};

export async function POST(req: NextRequest) {
  console.log("Reached");
  try {
    await connectDatabase();
    // get user from session
    const user = await getAuthUser(req);
    if (!user) return errorResponse(new ErrorHandler("Please login", 401));
    const data: DATA = await req.json();
    console.log({data});
    if (!data.productName && !data.productDescription && !data.productPrice && !data.productImage)
      return errorResponse(
        new ErrorHandler("Please provide data  for approval", 400)
      );

    const suggestedData: any = {
      product: data.productId,
      admin: data.adminId,
      author: user.id,
    };
    if (data.productImage)
      suggestedData.suggestedProductImage = data.productImage;
    if (data.productName) suggestedData.suggestedProductName = data.productName;
    if (data.productDescription)
      suggestedData.suggestedProductDescription = data.productDescription;
    if (data.productPrice)
      suggestedData.suggestedProductPrice = data.productPrice;
    const review = await reviewCollection.create(suggestedData);
    return NextResponse.json(
      {
        success: true,
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error as Error);
  }
}
