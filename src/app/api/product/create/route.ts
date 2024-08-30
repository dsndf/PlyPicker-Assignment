import { connectDatabase } from "@/db/connectDb";
import { getSessionUser } from "@/middlewares/getAuthUser";
import { productCollection } from "@/models/Product";
import { errorResponse } from "@/utils/errorResponse";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
 
    const data = await req.json();
    // const user = await getSessionUser("admin");   
    await connectDatabase();
    const product = await productCollection.create({ admin:"66d02bdbc1d31abd4d0ecbe0", ...data });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
