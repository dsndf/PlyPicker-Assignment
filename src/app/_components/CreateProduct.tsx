"use client";
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
import { useRouter } from "next/navigation";

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
        return data.split(" ").length >= 5;
      },
      {
        message: "Product Description must contain atlest 5 words",
      }
    ),
  productPrice: z.string().refine(
    (val) => {
      return Number(val) > 100;
    },
    { message: "Product price must be greater than 100" }
  ),
});

type InputType = z.infer<typeof FormSchema>;

const CreateProduct = () => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const changeImageFileHandler = (file: File) => {
    setImageFile(file);
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitHandler: SubmitHandler<InputType> = async (data) => {
    try {
      const uploadedUrl = await uploadProductImage(imageFile!);
      await axios.post(
        BASE_URL + "/api/product/create",
        {
          ...data,
          productImage: uploadedUrl,
        },
        { withCredentials: true }
      );
      toast.success("Product created");
      router.push("/dashboard");
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
      else if (error instanceof Error) toast.error(error.message);
    }
  };

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
            type="text"
            className="col-span-2"
            startContent={<CurrencyRupeeIcon className="w-4" />}
            {...register("productPrice")}
            errorMessage={errors?.productPrice?.message}
            isInvalid={!!errors?.productPrice}
          />
          <div className="w-full md:w-[300px] ">
            <PinturaCropper
              isRequired={true}
              imageUrl={""}
              control={control}
              height=""
              changeImageFileHandler={changeImageFileHandler}
            />
          </div>

          <div className="my-2 col-span-2">
            <Button
              type="submit"
              color={"secondary"}
              className="w-full"
              isLoading={isSubmitting}
            >
              Create Product
            </Button>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default CreateProduct;
