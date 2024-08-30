"use client";
import { BASE_URL } from "@/config/settings";
import { Chip, Spinner } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Submission {
  suggestedProductName?: string;
  suggestedProductDescription?: string;
  suggestedProductPrice?: string;
  suggestedProductImage?: string;
  author: string;
  admin: string;
  product: string;
  createdAt: Date;
  _id: string;
  status: string; // Added status field assuming it exists
}

export default function SubmissionsTable() {
  const [loadingState, setLoadingState] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [mySubmissions, setMySubmissions] = useState<Submission[]>([]);

  const fetchSubmissions = async () => {
    setLoadingState("loading");
    try {
      const res = await fetch(BASE_URL + "/api/review/my/submissions", {
        credentials: "include",
      });
      const data = await res.json();
      setMySubmissions(data.mySubmissions); // Assuming the API response is an array of submissions
      setLoadingState("idle");
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
      setLoadingState("error");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <Table aria-label="Submissions Table">
      <TableHeader>
        <TableColumn>PRODUCT ID</TableColumn>
        <TableColumn>ADMIN ID</TableColumn>
        <TableColumn>Modified</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>CREATED AT</TableColumn>
      </TableHeader>
      <TableBody
        items={mySubmissions}
        loadingState={loadingState}
        loadingContent={
          <Spinner color="primary" label="Loading submissions..." />
        }
      >
        {(item: Submission) => (
          <TableRow key={item._id}>
            <TableCell>
              <Link href={`/products/${item.product}`}>{item.product}</Link>
            </TableCell>
            <TableCell>{item.admin}</TableCell>
            <TableCell>
              <div className="flex gap">
                {item.suggestedProductName && (
                  <Chip
                    className="capitalize"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    Name
                  </Chip>
                )}
                {item.suggestedProductImage && (
                  <Chip
                    className="capitalize"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    Image
                  </Chip>
                )}
                {item.suggestedProductDescription && (
                  <Chip
                    className="capitalize"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    Description
                  </Chip>
                )}
                {item.suggestedProductPrice && (
                  <Chip
                    className="capitalize"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    Price
                  </Chip>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Chip
                className="capitalize"
                color={
                  item.status === "Pending"
                    ? "warning"
                    : item.status === "Approved"
                    ? "success"
                    : "danger"
                }
                size="sm"
                variant="flat"
              >
                {item.status}
              </Chip>
            </TableCell>
            <TableCell>
              {new Date(item.createdAt).toLocaleTimeString()}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
