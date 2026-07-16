import jwt from "jsonwebtoken";
import Clients from "../models/clients.js";
import Employees from "../models/employees.js";
import { config } from "../config.js";

// Helper to generate JWT
export const generateToken = (payload) => {
    return jwt.sign(payload, config.JWT.secret, { expiresIn: "24h" });
};

const LoginService = {
    /**
     * Authenticates a client
     */
    loginClient: async (email, password) => {
        const client = await Clients.findOne({ email });
        if (!client) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            throw error;
        }

        if (client.status !== "active") {
            const error = new Error("Your account is inactive. Please contact support");
            error.status = 403;
            throw error;
        }

        const isMatch = await client.comparePassword(password);
        if (!isMatch) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            throw error;
        }

        const clientData = client.toObject();
        delete clientData.password;

        const token = generateToken({ id: client._id, email: client.email, type: "client" });

        return { token, user: clientData };
    },

    /**
     * Authenticates an employee
     */
    loginEmployee: async (email, password) => {
        const employee = await Employees.findOne({ email });
        if (!employee) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            throw error;
        }

        if (employee.status !== "active") {
            const error = new Error("Employee account is inactive");
            error.status = 403;
            throw error;
        }

        const isMatch = await employee.comparePassword(password);
        if (!isMatch) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            throw error;
        }

        const employeeData = employee.toObject();
        delete employeeData.password;

        const token = generateToken({ id: employee._id, email: employee.email, role: employee.role, type: "employee" });

        return { token, user: employeeData };
    },

    /**
     * Unified login checking both collections
     */
    unifiedLogin: async (email, password) => {
        const cleanEmail = String(email).trim().toLowerCase();

        // 1. Try employee first
        const employee = await Employees.findOne({ email: cleanEmail });
        if (employee) {
            if (employee.status !== "active") {
                const error = new Error("Account is inactive");
                error.status = 403;
                throw error;
            }

            const isMatch = await employee.comparePassword(password);
            if (!isMatch) {
                const error = new Error("Invalid credentials");
                error.status = 401;
                throw error;
            }

            const employeeData = employee.toObject();
            delete employeeData.password;

            const token = generateToken({ id: employee._id, email: employee.email, role: employee.role, type: "employee" });
            return { token, user: employeeData, type: "employee" };
        }

        // 2. Try client next
        const client = await Clients.findOne({ email: cleanEmail });
        if (client) {
            if (client.status !== "active") {
                const error = new Error("Account is inactive");
                error.status = 403;
                throw error;
            }

            const isMatch = await client.comparePassword(password);
            if (!isMatch) {
                const error = new Error("Invalid credentials");
                error.status = 401;
                throw error;
            }

            const clientData = client.toObject();
            delete clientData.password;

            const token = generateToken({ id: client._id, email: client.email, type: "client" });
            return { token, user: clientData, type: "client" };
        }

        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }
};

export default LoginService;
