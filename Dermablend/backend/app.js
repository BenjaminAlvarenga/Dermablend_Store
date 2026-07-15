import express from "express";
import cookieParser from "cookie-parser";

// Import API routes
import authRoutes from "./src/routes/auth.js";
import clientRoutes from "./src/routes/clients.js";
import customizationRoutes from "./src/routes/customizations.js";
import employeeRoutes from "./src/routes/employees.js";
import orderRoutes from "./src/routes/orders.js";
import productRoutes from "./src/routes/products.js";
import promotionRoutes from "./src/routes/promotions.js";
import reviewRoutes from "./src/routes/reviews.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom CORS middleware to support credentials (cookies/authorization headers)
app.use((req, res, next) => {
    const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://localhost:8080"
    ];
    const origin = req.headers.origin;
    if (origin && (allowedOrigins.includes(origin) || origin.startsWith("http://localhost:"))) {
        res.header("Access-Control-Allow-Origin", origin);
    } else {
        res.header("Access-Control-Allow-Origin", "*");
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Route registration
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/customizations", customizationRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/reviews", reviewRoutes);

// Root route placeholder
app.get("/", (req, res) => {
    res.json({ message: "Dermablend Store API is running" });
});

// 404 Route handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.originalUrl} not found`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    
    // Mongoose validation errors or duplicate keys
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            message: `Conflict: Duplicate value for field '${field}'`
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: `Invalid format for field '${err.path}' with value '${err.value}'`
        });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export default app;