import { Spinner } from "@nextui-org/react";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center p-6">
      <Spinner label="Loading..." size="lg" color="primary" />
    </div>
  );
};

export default loading;
