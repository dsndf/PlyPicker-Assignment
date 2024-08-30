import { connectDatabase } from "@/db/connectDb";
import { reviewCollection } from "@/models/Review";
import React from "react";
import ProductCard, { Product } from "./ProductCard";
import { Button } from "@nextui-org/react";
import { updatePendingReview } from "@/lib/actions/adminActions";
import FormButton from "./FormButton";

type Props = {
  id: string;
};

const PendingRequestDetails = async ({ id }: Props) => {
  await connectDatabase();
  const pendingRequest = await reviewCollection
    .findById(id)
    .populate(
      "product",
      "productName productDescription productImage productPrice"
    )
    .lean();
  const product = {
    ...pendingRequest?.product,
  };

  const modifiedProduct: { [key: string]: any } = {
    ...product,
  };
  if (pendingRequest?.suggestedProductName)
    modifiedProduct["productName"] = pendingRequest.suggestedProductName;
  if (pendingRequest?.suggestedProductDescription)
    modifiedProduct["productDescription"] =
      pendingRequest.suggestedProductDescription;
  if (pendingRequest?.suggestedProductPrice)
    modifiedProduct["productPrice"] = pendingRequest.suggestedProductPrice;
  if (pendingRequest?.suggestedProductImage)
    modifiedProduct["productImage"] = pendingRequest.suggestedProductImage;

  return (
    <div className="flex justify-start gap-10">
      <div className="flex flex-col gap-2 w-[250px]">
        <p>Before</p>
        <ProductCard product={product as Product} />
      </div>
      <div className="flex flex-col gap-2 w-[250px] ">
        <p>After</p>
        <ProductCard product={modifiedProduct as Product} />
        <div className="flex justify-start gap-4 py-2">
          {" "}
          <form action={updatePendingReview}>
            <input type="hidden" value={id} name="pendingReviewId" />
            <input
              type="hidden"
              value={"Approved"}
              name="pendingReviewStatus"
            />
            <FormButton text="Approve" status="Approved" />
          </form>
          <form action={updatePendingReview}>
            <input type="hidden" value={id} name="pendingReviewId" />
            <input
              type="hidden"
              value={"Rejected"}
              name="pendingReviewStatus"
            />
            <FormButton text="Reject" status="Rejected" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PendingRequestDetails;
