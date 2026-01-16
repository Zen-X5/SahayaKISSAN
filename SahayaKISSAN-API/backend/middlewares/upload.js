import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sahayakissan-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp","OIP"],
  },
});

const upload = multer({
  storage,
  limits: { files: 6 },
});

export default upload;
