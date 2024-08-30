import { imgDb } from "@/firebase/firebaseConfig";
import { randomBytes, randomUUID } from "crypto";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadProductImage = async (file: File): Promise<string> => {
  const uploadPath = ref(
    imgDb,
    `/products/images/${randomBytes(20).toString("hex")}`
  );
  const data = await uploadBytes(uploadPath, file);
  const url = await getDownloadURL(data.ref);
  return url;
};
