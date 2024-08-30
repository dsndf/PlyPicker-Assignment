"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { toast } from "react-hot-toast";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import z from "zod";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    email: z.string().email("Please enter the valid email address"),
    password: z
      .string()
      .min(6, "Password must be 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be 6 characters")
      .max(50, "Password must be less than 50 characters"),
    accepted: z.literal(true, {
      errorMap: () => {
        return { message: "Please accept the terms" };
      },
    }),
    role: z
      .string()
      .refine((val) => val !== "", { message: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password ans confirm password doesn't match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const saveUser: SubmitHandler<InputType> = async (data) => {
    try {
      console.log({ data });
      const { accepted, confirmPassword, ...user } = data;
      await registerUser(user);
      toast.success("Registerd successfylly");
      router.replace("/login");
      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something Went Wrong");
    }
  };

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  // toast.success("Success")
  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="w-full p-2 flex flex-col  gap-3  border-gray-600 shadow rounded-md"
    >
      <Input
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
        {...register("email")}
        errorMessage={errors?.email?.message}
        isInvalid={!!errors?.email}
      />

      <Input
        label="Password"
        type={isPassVisible ? "text" : "password"}

        startContent={<KeyIcon className="w-4" />}
        endContent={
          !isPassVisible ? (
            <EyeIcon
              onClick={() => setIsPassVisible(true)}
              className=" w-4 cursor-pointer"
            />
          ) : (
            <EyeSlashIcon
              onClick={() => setIsPassVisible(false)}
              className=" w-4 cursor-pointer"
            />
          )
        }
        {...register("password")}
        errorMessage={errors?.password?.message}
        isInvalid={!!errors?.password}
      />
      <Input
        label="Confirm Password"
        type="password"
        startContent={<KeyIcon className="w-4" />}
        {...register("confirmPassword")}
        errorMessage={errors?.confirmPassword?.message}
        isInvalid={!!errors?.confirmPassword}
      />
      <Controller
        control={control}
        name="role"
        render={({ field }) => {
          return (
            <RadioGroup
              label="Select your role"
              onChange={field.onChange}
              onBlur={field?.onBlur}
            >
              <Radio value="team-member">Team member</Radio>
              <Radio value="admin">Admin</Radio>
            </RadioGroup>
          );
        }}
      ></Controller>

      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <>
            <Checkbox
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="col-span-2 text-[15px]"
            >
              I Accept The <Link href="/terms">Terms</Link> & Conditions
            </Checkbox>
            {errors.accepted && (
              <p className="text-red-600 text-[14px]">
                {errors?.accepted?.message}
              </p>
            )}
          </>
        )}
      ></Controller>

      <div className="col-span-2">
        {" "}
        <Button
          isLoading={isSubmitting}
          type="submit"
          color="primary"
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
