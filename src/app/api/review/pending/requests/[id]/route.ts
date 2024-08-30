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
export async function GET(req: NextRequest, { params: { id } }: ParamsType) {
  console.log("Reached");
  try {
    await connectDatabase();
    const user = await getAuthUser(req, "admin");
    const pendingRequest = await reviewCollection
      .findOne({
        author: user.id,
        _id: id,
      })
      .populate("product");
    if (!pendingRequest)
      throw new ErrorHandler("Pending request not found", 404);
    return NextResponse.json({
      success: true,
      pendingRequest,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
