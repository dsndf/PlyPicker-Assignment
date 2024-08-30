import { productCollection } from "@/models/Product";
import { getServerSession } from "next-auth";
import Link from "next/link";
;
import { connectDatabase } from "@/db/connectDb";
import ProductCard, { Product } from "./ProductCard";
import { authOptions } from "@/lib/authOptions";

export default async function Products() {
  const session = await getServerSession(authOptions);
  await connectDatabase();
  const products: Product[] =
    session?.user.role === "admin"
      ? await productCollection.find({ admin: session?.user.id })
      : await productCollection.find();
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="w-full gap-4 grid grid-cols-2 sm:grid-cols-4">
      {products.map((item, index) => (
        <Link href={`/products/${item._id}`} key={index}>
          <ProductCard product={item} />
        </Link>
      ))}
    </div>
  );
}
