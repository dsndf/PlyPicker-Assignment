import { Button, Image, Input, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";


import "@pqina/pintura/pintura.css";
import "./index.module.css";
import { uploadProductImage } from "@/lib/uploadProductImage";
import ImageCropModal from "./ImageCropModal";
import { URL } from "url";
import { PhotoIcon } from "@heroicons/react/16/solid";

type Props = {
  isRequired?: boolean;
  control: any;
  imageUrl: string;
  changeImageFileHandler: (file: File) => void;
  height?: string;
};

const PinturaCropper = ({
  control,
  imageUrl,
  changeImageFileHandler,
  isRequired = false,
  height="300px"
}: Props) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [pinturaToggle, setPinturaToggle] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeImagePreviewHandler = (res: { data: string; file: File }) => {
    console.log(res.data);
    setImagePreview(res.data);
    changeImageFileHandler(res.file);
  };
  console.log({ imagePreview });
  return (
    <div className="flex flex-col gap-2">
      <div className={`relative h-[${height}] rounded-md overflow-hidden`}>
        <Image alt="NextUI hero Image" src={imagePreview || imageUrl} />
      </div>
      {imagePreview && imagePreview !== imageUrl && (
        <Button color="primary" variant="faded" onPress={onOpen}>
          Crop and Edit
        </Button>
      )}
      {isOpen && (
        <ImageCropModal
          image={imagePreview}
          isOpen={isOpen}
          onClose={onClose}
          changeImagePreviewHandler={changeImagePreviewHandler}
        />
      )}
      <Input
        label="Product Image"
        type="file"
        required={isRequired}
        endContent={<PhotoIcon className="w-4" />}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) setImagePreview(imageUrl);
          if (!file) return;
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
            changeImageFileHandler(file);
          };
          reader.readAsDataURL(file);
        }}
      />
    </div>
  );
};

export default PinturaCropper;
