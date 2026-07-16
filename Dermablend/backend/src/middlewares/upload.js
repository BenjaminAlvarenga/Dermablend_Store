import multer from "multer";

// Keeps the file in memory as a Buffer so it can be streamed straight to
// Cloudinary without writing anything to disk.
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    }
});

export default upload;
