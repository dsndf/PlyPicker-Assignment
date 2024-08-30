import React from "react";
import SinginForm from "../_components/SinginForm";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const LoginPage = ({ searchParams: { callbackUrl } }: Props) => {
  return (
    <div className="flex justify-center p-6">
      <div className="w-[400px]" >
        <h3 className="text-center my-2">SIGN IN</h3>
        <SinginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
};

export default LoginPage;
