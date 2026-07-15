import jwt from "jsonwebtoken";
import crypto from "crypto";
import Clients from "../models/clients.js";
import Employees from "../models/employees.js";
import { config } from "../config.js";
import { sendRecoveryEmail } from "../services/mailService.js";

// Helper to generate JWT
const generateToken = (payload) => {
    return jwt.sign(payload, config.JWT.secret, { expiresIn: "24h" });
};

// Helper to set cookie
const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
};

export const clientRegister = async (req, res, next) => {
    try {
        const { name, email, password, birthdate, phone, skin_type, skin_tone, favorites } = req.body;

        // Validations
        if (!name || !email || !password || !birthdate || !phone || !skin_type || !skin_tone) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required client fields"
            });
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(String(email).trim())) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address format"
            });
        }

        if (String(password).length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        if (isNaN(Date.parse(birthdate))) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid date format for birthdate"
            });
        }

        // Check if email already exists
        const existingClient = await Clients.findOne({ email });
        if (existingClient) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        const newClient = new Clients({
            name,
            email,
            password,
            birthdate,
            phone,
            skin_type,
            skin_tone,
            favorites: favorites || [],
            is_verified: false,
            status: "active"
        });

        await newClient.save();

        const clientData = newClient.toObject();
        delete clientData.password;

        const token = generateToken({ id: newClient._id, email: newClient.email, type: "client" });
        setTokenCookie(res, token);

        return res.status(201).json({
            success: true,
            message: "Client registered successfully",
            token,
            user: clientData
        });
    } catch (error) {
        next(error);
    }
};

export const clientLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const client = await Clients.findOne({ email });
        if (!client) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (client.status !== "active") {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive. Please contact support"
            });
        }

        const isMatch = await client.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const clientData = client.toObject();
        delete clientData.password;

        const token = generateToken({ id: client._id, email: client.email, type: "client" });
        setTokenCookie(res, token);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: clientData
        });
    } catch (error) {
        next(error);
    }
};

export const employeeRegister = async (req, res, next) => {
    try {
        const { name, email, password, role, hire_date, salary } = req.body;

        if (!name || !email || !password || !role || !hire_date || !salary) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required employee fields"
            });
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(String(email).trim())) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address format"
            });
        }

        if (String(password).length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        if (isNaN(Date.parse(hire_date))) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid date format for hire_date"
            });
        }

        if (Number(salary) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Salary must be a positive number greater than 0"
            });
        }

        const existingEmployee = await Employees.findOne({ email });
        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: "Email is already in use by another employee"
            });
        }

        const newEmployee = new Employees({
            name,
            email,
            password,
            role,
            hire_date,
            salary,
            status: "active"
        });

        await newEmployee.save();

        const employeeData = newEmployee.toObject();
        delete employeeData.password;

        return res.status(201).json({
            success: true,
            message: "Employee registered successfully",
            user: employeeData
        });
    } catch (error) {
        next(error);
    }
};

export const employeeLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const employee = await Employees.findOne({ email });
        if (!employee) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (employee.status !== "active") {
            return res.status(403).json({
                success: false,
                message: "Employee account is inactive"
            });
        }

        const isMatch = await employee.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const employeeData = employee.toObject();
        delete employeeData.password;

        const token = generateToken({ id: employee._id, email: employee.email, role: employee.role, type: "employee" });
        setTokenCookie(res, token);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: employeeData
        });
    } catch (error) {
        next(error);
    }
};

// Generic login endpoint checking both tables
export const unifiedLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Try employee first
        const employee = await Employees.findOne({ email });
        if (employee) {
            if (employee.status !== "active") {
                return res.status(403).json({ success: false, message: "Account is inactive" });
            }
            const isMatch = await employee.comparePassword(password);
            if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

            const employeeData = employee.toObject();
            delete employeeData.password;
            const token = generateToken({ id: employee._id, email: employee.email, role: employee.role, type: "employee" });
            setTokenCookie(res, token);

            return res.status(200).json({ success: true, message: "Login successful", token, user: employeeData, type: "employee" });
        }

        // Try client next
        const client = await Clients.findOne({ email });
        if (client) {
            if (client.status !== "active") {
                return res.status(403).json({ success: false, message: "Account is inactive" });
            }
            const isMatch = await client.comparePassword(password);
            if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

            const clientData = client.toObject();
            delete clientData.password;
            const token = generateToken({ id: client._id, email: client.email, type: "client" });
            setTokenCookie(res, token);

            return res.status(200).json({ success: true, message: "Login successful", token, user: clientData, type: "client" });
        }

        return res.status(401).json({ success: false, message: "Invalid email or password" });
    } catch (error) {
        next(error);
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

export const getProfile = async (req, res, next) => {
    try {
        const { id, type } = req.user;

        let user = null;
        if (type === "employee") {
            user = await Employees.findById(id).select("-password");
        } else {
            user = await Clients.findById(id).select("-password");
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

export const clientRecoveryRequest = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(String(email).trim())) {
            return res.status(400).json({ success: false, message: "Please provide a valid email address format" });
        }

        const cleanEmail = String(email).trim().toLowerCase();

        // 1. Check Employees first
        const employee = await Employees.findOne({ email: cleanEmail });
        if (employee) {
            if (employee.status === "active") {
                const token = crypto.randomBytes(32).toString("hex");
                employee.recovery_token = token;
                employee.recovery_token_expires = Date.now() + 3600000; // 1 hour
                await employee.save();
                await sendRecoveryEmail(cleanEmail, token);
            }
            return res.status(200).json({
                success: true,
                message: "Si la cuenta está registrada, se ha enviado un correo con instrucciones de recuperación"
            });
        }

        // 2. Check Clients next
        const client = await Clients.findOne({ email: cleanEmail });
        if (client) {
            if (client.status === "active") {
                const token = crypto.randomBytes(32).toString("hex");
                client.recovery_token = token;
                client.recovery_token_expires = Date.now() + 3600000; // 1 hour
                await client.save();
                await sendRecoveryEmail(cleanEmail, token);
            }
            return res.status(200).json({
                success: true,
                message: "Si la cuenta está registrada, se ha enviado un correo con instrucciones de recuperación"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Si la cuenta está registrada, se ha enviado un correo con instrucciones de recuperación"
        });
    } catch (error) {
        next(error);
    }
};

export const clientRecoveryReset = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: "Token and newPassword are required" });
        }

        if (String(newPassword).length < 6) {
            return res.status(400).json({ success: false, message: "New password must be at least 6 characters long" });
        }

        // 1. Search in Employees
        const employee = await Employees.findOne({
            recovery_token: token,
            recovery_token_expires: { $gt: new Date() }
        });

        if (employee) {
            employee.password = newPassword;
            employee.recovery_token = null;
            employee.recovery_token_expires = null;
            await employee.save();

            return res.status(200).json({
                success: true,
                message: "Password reset successfully"
            });
        }

        // 2. Search in Clients
        const client = await Clients.findOne({
            recovery_token: token,
            recovery_token_expires: { $gt: new Date() }
        });

        if (client) {
            client.password = newPassword;
            client.recovery_token = null;
            client.recovery_token_expires = null;
            await client.save();

            return res.status(200).json({
                success: true,
                message: "Password reset successfully"
            });
        }

        return res.status(400).json({
            success: false,
            message: "The recovery token is invalid or has expired"
        });
    } catch (error) {
        next(error);
    }
};
