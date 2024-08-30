import { connectDatabase } from "@/db/connectDb";
import { getAuthUser } from "@/middlewares/getAuthUser";
import { productCollection } from "@/models/Product";
import { ErrorHandler } from "@/utils/errorHandler";
import { errorResponse } from "@/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Reached");
  try {
    await connectDatabase();
    const user = await getAuthUser(req);
    const products =
      user.role === "admin"
        ? await productCollection.find({ admin: user.id })
        : await productCollection.find();
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
