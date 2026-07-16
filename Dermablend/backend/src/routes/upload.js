import { Router } from "express";
import upload from "../middlewares/upload.js";
import { uploadImage } from "../controller/uploadController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Only Admin/Employee upload images (used by the Products and Employees forms)
router.post("/", authMiddleware, roleMiddleware(["Admin", "Employee"]), upload.single("image"), uploadImage);

export default router;
