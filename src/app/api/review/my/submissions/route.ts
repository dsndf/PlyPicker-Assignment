import { connectDatabase } from "@/db/connectDb";
import { getAuthUser } from "@/middlewares/getAuthUser";
import { reviewCollection } from "@/models/Review";
import { errorResponse } from "@/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Reached");
  try {
    await connectDatabase();
    const user = await getAuthUser(req);
    const mySubmissions = await reviewCollection.find({ author: user.id });
    return NextResponse.json({
      success: true,
      mySubmissions,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
