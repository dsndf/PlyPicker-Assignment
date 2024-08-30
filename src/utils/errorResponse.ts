import { NextResponse } from "next/server";
import { ErrorHandler } from "./errorHandler";

interface ErrorResponseParams extends Error {
  statusCode?: number;
}

export const errorResponse = (err: ErrorResponseParams) => {
  const response = {
    message: "Internal Server Error",
    statusCode: 500,
  };
  response.message = err?.message || response.message;
  response.statusCode = err?.statusCode || response.statusCode;
  return NextResponse.json(
    {
      success: false,
      message: response.message,
    },
    {
      status: response.statusCode,
    }
  );
};
