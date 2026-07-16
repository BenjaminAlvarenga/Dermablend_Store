import cloudinary from "../cloudinary.js";

/**
 * Uploads a single image file (received via multer, in memory) to Cloudinary
 * and returns the resulting secure URL and public_id.
 */
export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            });
        }

        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(base64, {
            folder: "dermablend"
        });

        return res.status(201).json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        next(error);
    }
};
