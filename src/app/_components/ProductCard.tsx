import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export interface Product {
  productName: string;
  productPrice: string;
  productImage: string;
  productDescription: string;
  admin: string;
  _id: string;
}
type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  console.log({ product });
  return (
    <Card shadow="sm" className="w-full">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.productName}
          className="w-full object-fill h-[140px]"
          src={product.productImage}
        />
      </CardBody>
      <CardFooter className="text-small justify-between items-start">
        <div>
          <b>{product.productName} </b>
          <p className="mt-1 text-gray-500">{product.productDescription}</p>
        </div>
        <p className="text-default-500">{product.productPrice} ₹</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
