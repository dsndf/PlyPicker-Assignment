"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

type Props = {
  status: "Approved" | "Rejected";
  text: string;
};

const FormButton = ({ status, text }: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      color={status === "Approved" ? "success" : "danger"}
      isLoading={pending}
    >
      {text}
    </Button>
  );
};

export default FormButton;
