import jwt from "jsonwebtoken";
import { config } from "../config.js";
import Clients from "../models/clients.js";
import Employees from "../models/employees.js";

// Verify token and attach user to request
export const authMiddleware = async (req, res, next) => {
    let token = req.cookies?.token;

    // Check header if not in cookie
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided, authorization denied"
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT.secret);

        let user = null;
        if (decoded.type === "employee") {
            user = await Employees.findById(decoded.id);
        } else if (decoded.type === "client") {
            user = await Clients.findById(decoded.id);
        } else {
            // Fallback lookup if type is missing in legacy token
            user = await Employees.findById(decoded.id) || await Clients.findById(decoded.id);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found, authorization denied"
            });
        }

        if (user.status !== "active") {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive. Please contact support"
            });
        }

        // Attach parsed user data to request
        req.user = {
            id: user._id,
            email: user.email,
            role: decoded.type === "employee" ? user.role : "Client",
            type: decoded.type || (user.role ? "employee" : "client")
        };

        next();
    } catch (error) {
        console.error("JWT Auth Middleware Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Token is not valid or has expired"
        });
    }
};

// Check if user has required roles
export const roleMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user attached to request"
            });
        }

        const hasRole = allowedRoles.includes(req.user.role);
        if (!hasRole) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Access restricted to roles: [${allowedRoles.join(", ")}]`
            });
        }

        next();
    };
};
