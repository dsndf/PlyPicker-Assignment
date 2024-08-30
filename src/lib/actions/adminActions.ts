"use server";
import { connectDatabase } from "@/db/connectDb";
import { productCollection } from "@/models/Product";
import { reviewCollection } from "@/models/Review";
import { ErrorHandler } from "@/utils/errorHandler";
import { redirect } from "next/navigation";

export const updatePendingReview = async (formData: FormData) => {
  console.log("SERVER ACTION CALLED");
  console.log(formData.get("pendingReviewId"));
  console.log(formData.get("pendingReviewStatus"));
  await connectDatabase();
  const review = await reviewCollection.findById(
    formData.get("pendingReviewId")
  );
  if (!review) throw new ErrorHandler("Review Not Found", 404);
  const product = await productCollection.findById(review.product);
  if (!product) throw new ErrorHandler("Product not found", 404);
  if (review.suggestedProductName)
    product.productName = review.suggestedProductName;
  if (review.suggestedProductImage)
    product.productImage = review.suggestedProductImage;
  if (review.suggestedProductDescription)
    product.productDescription = review.suggestedProductDescription;
  if (review.suggestedProductPrice)
    product.productPrice = review.suggestedProductPrice;
  await product.save();
  review.status = formData.get("pendingReviewStatus") as
    | "Approved"
    | "Rejected";
  await review.save();
  redirect("/profile/pending/requests");
};
