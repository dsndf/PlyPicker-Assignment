"use client";
import { useParams } from "next/navigation";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import {
  ArchiveBoxIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
} from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import PinturaCropper from "./Pintura/PinturaCropper";
import { useState } from "react";
import { uploadProductImage } from "@/lib/uploadProductImage";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/config/settings";
import toast from "react-hot-toast";

interface Product {
  productName: string;
  productPrice: string;
  productImage: string;
  productDescription: string;
  admin: string;
  _id: string;
}
type Props = {
  initialProductDetails: Product;
};

const FormSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(3, "Product name must be atleast 3 letters"),
  productDescription: z
    .string()
    .trim()
    .refine(
      (data) => {
        return data.split(" ").length < 20;
      },
      {
        message: "description must contain atlest 20 words",
      }
    ),
  productPrice: z.string(),
});

type InputType = z.infer<typeof FormSchema>;

const ProductDetailForm = ({ initialProductDetails }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const changeImageFileHandler = (file: File) => {
    setImageFile(file);
  };
  console.log({ initialProductDetails });
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<InputType>({
    defaultValues: {
      productName: initialProductDetails.productName,
      productDescription: initialProductDetails.productDescription,
      productPrice: initialProductDetails.productPrice,
    },
    resolver: zodResolver(FormSchema),
  });

  const submitHandler: SubmitHandler<InputType> = async (data) => {
    console.log({ data, imageFile });
    try {
      if (role === "team-member") {
        await submitChangesForApproval(data);
        toast.success("Changes submitted for approval");
      } else {
        await updateProductAsAdmin(data);
        toast.success("Product updated");
      }
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
      else if (error instanceof Error) toast.error(error.message);
    }

    return data;
  };

  const { data: session } = useSession();
  const role = session?.user?.role || "admin";

  async function submitChangesForApproval(data: InputType) {
    let uploadedUrl: string = "";
    if (imageFile) {
      uploadedUrl = await uploadProductImage(imageFile!);
    }
    const changes: Partial<InputType> = {
      productName:
        data.productName !== initialProductDetails.productName
          ? data.productName
          : undefined,
      productDescription:
        data.productDescription !== initialProductDetails.productDescription
          ? data.productDescription
          : undefined,
      productPrice:
        data.productPrice !== initialProductDetails.productPrice
          ? data.productPrice
          : undefined,
    };
    const bodyData = {
      ...changes,
      productImage: uploadedUrl,
      adminId: initialProductDetails.admin,
      productId: initialProductDetails._id,
    };
    await axios.post(BASE_URL + "/api/review/create", bodyData, {
      withCredentials: true,
    });
  }
  async function updateProductAsAdmin(data: InputType) {
    let uploadedUrl: string = "";
    if (imageFile) {
      uploadedUrl = await uploadProductImage(imageFile!);
    }

    const bodyData = {
      ...data,
      productImage: uploadedUrl || initialProductDetails.productImage,
    };
    const {
      data: { updatedProduct },
    } = await axios.put(
      BASE_URL + "/api/product/update/" + initialProductDetails._id,
      bodyData,
      {
        withCredentials: true,
      }
    );
  }

  return (
    <div>
      <div className=" grid grid-cols-1 gap-4 ">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="p-2 grid grid-cols-1 gap-3   border-gray-600 shadow rounded-md"
        >
          <Input
            label="Product Name"
            className="col-span-2"
            startContent={<ArchiveBoxIcon className="w-4" />}
            {...register("productName")}
            errorMessage={errors?.productName?.message}
            isInvalid={!!errors?.productName}
          />
          <Input
            label="Product Description"
            className="col-span-2"
            startContent={<DocumentTextIcon className="w-4" />}
            {...register("productDescription")}
            errorMessage={errors?.productDescription?.message}
            isInvalid={!!errors?.productDescription}
          />
          <Input
            label="Price"
            type="number"
            className="col-span-2"
            startContent={<CurrencyRupeeIcon className="w-4" />}
            {...register("productPrice")}
            errorMessage={errors?.productPrice?.message}
            isInvalid={!!errors?.productPrice}
          />
          <div className="w-full md:w-[300px] ">
            <PinturaCropper
              imageUrl={initialProductDetails.productImage}
              control={control}
              changeImageFileHandler={changeImageFileHandler}
            />
          </div>

          <div className="my-2 col-span-2">
            <Button
              type="submit"
              color={role === "team-member" ? "primary" : "secondary"}
              className="w-full"
              isLoading={isSubmitting}
            >
              {role === "team-member"
                ? "Submit changes for approval"
                : "Update product as admin"}
            </Button>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default ProductDetailForm;
