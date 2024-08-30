import React from "react";
import { SignupForm } from "../_components/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex justify-center p-6 items-center w-full">
      <div  className="w-[400px]">
        <h3 className="my-2 text-center">SIGN UP</h3>
        <SignupForm/>
      </div>
    </div>
  );
};

export default SignupPage;
