import { connectDatabase } from "@/db/connectDb";
import { getAuthUser } from "@/middlewares/getAuthUser";

import { reviewCollection } from "@/models/Review";
import { ErrorHandler } from "@/utils/errorHandler";
import { errorResponse } from "@/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: {
    id: string;
  };
};

export async function PUT(req: NextRequest, { params: { id } }: ParamsType) {
  console.log("Reached");
  try {
    await connectDatabase();
    const data = await req.json();
    const user = await getAuthUser(req, "admin");
    const review = await reviewCollection.findById(id);
    if (!review)
      return errorResponse(new ErrorHandler("Review Not Found", 404));
    review.status = data.status;
    await review.save();
    return NextResponse.json({
      success: true,
      message:
        review.status === "Approved"
          ? "Approved successfully"
          : "Rejected successfully",
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
