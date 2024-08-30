import { connectDatabase } from "@/db/connectDb";
import { getAuthUser } from "@/middlewares/getAuthUser";
import { productCollection } from "@/models/Product";
import { errorResponse } from "@/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await getAuthUser(req, "admin");
    await connectDatabase();
    const product = await productCollection.create({ admin: user.id, ...data });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
