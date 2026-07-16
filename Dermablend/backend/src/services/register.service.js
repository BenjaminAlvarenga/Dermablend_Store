import crypto from "crypto";
import Clients from "../models/clients.js";
import Employees from "../models/employees.js";
import { generateToken } from "./login.service.js";
import { sendVerificationEmail } from "./mailService.js";

const RegisterService = {
    /**
     * Registers a new client
     */
    registerClient: async (clientData) => {
        const { name, email, password, birthdate, phone, skin_type, skin_tone, favorites } = clientData;

        // Check duplicates
        const existingClient = await Clients.findOne({ email });
        if (existingClient) {
            const error = new Error("Email is already registered");
            error.status = 409;
            throw error;
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

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
            status: "active",
            verification_token: verificationToken,
            verification_token_expires: Date.now() + 24 * 3600000 // 24 hours
        });

        await newClient.save();

        try {
            await sendVerificationEmail(newClient.email, verificationToken);
        } catch (error) {
            // Registration should still succeed even if the email fails to send;
            // the client can request it again later if a resend endpoint is added.
            console.error("Could not send verification email:", error.message);
        }

        const clientObj = newClient.toObject();
        delete clientObj.password;

        const token = generateToken({ id: newClient._id, email: newClient.email, type: "client" });

        return { token, user: clientObj };
    },

    /**
     * Registers a new employee
     */
    registerEmployee: async (employeeData) => {
        const { name, email, password, role, hire_date, salary } = employeeData;

        // Check duplicates
        const existingEmployee = await Employees.findOne({ email });
        if (existingEmployee) {
            const error = new Error("Email is already in use by another employee");
            error.status = 409;
            throw error;
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

        const employeeObj = newEmployee.toObject();
        delete employeeObj.password;

        return { user: employeeObj };
    },

    /**
     * Confirms a client's account using a valid verification token
     */
    verifyEmail: async (token) => {
        const client = await Clients.findOne({
            verification_token: token,
            verification_token_expires: { $gt: new Date() }
        });

        if (!client) {
            const error = new Error("The verification link is invalid or has expired");
            error.status = 400;
            throw error;
        }

        client.is_verified = true;
        client.verification_token = null;
        client.verification_token_expires = null;
        await client.save();

        return { message: "Account verified successfully" };
    }
};

export default RegisterService;
