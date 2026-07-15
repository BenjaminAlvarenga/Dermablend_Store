import crypto from "crypto";
import Clients from "../models/clients.js";
import Employees from "../models/employees.js";
import { sendRecoveryEmail } from "./mailService.js";

const RecoveryPasswordService = {
    /**
     * Solicits a password recovery email
     */
    requestRecovery: async (email) => {
        const cleanEmail = String(email).trim().toLowerCase();

        // 1. Try Employee first
        const employee = await Employees.findOne({ email: cleanEmail });
        if (employee) {
            if (employee.status === "active") {
                const token = crypto.randomBytes(32).toString("hex");
                employee.recovery_token = token;
                employee.recovery_token_expires = Date.now() + 3600000; // 1 hour
                await employee.save();
                await sendRecoveryEmail(cleanEmail, token);
            }
            return { message: "Si la cuenta está registrada, se ha enviado un correo con instrucciones de recuperación" };
        }

        // 2. Try Client next
        const client = await Clients.findOne({ email: cleanEmail });
        if (client) {
            if (client.status === "active") {
                const token = crypto.randomBytes(32).toString("hex");
                client.recovery_token = token;
                client.recovery_token_expires = Date.now() + 3600000; // 1 hour
                await client.save();
                await sendRecoveryEmail(cleanEmail, token);
            }
            return { message: "Si la cuenta está registrada, se ha enviado un correo con instrucciones de recuperación" };
        }

        // Fallback for non-existent emails (always success for security)
        return { message: "Si la cuenta está registrada, se ha enviado un correo con instrucciones de recuperación" };
    },

    /**
     * Resets password using valid token
     */
    resetPassword: async (token, newPassword) => {
        // 1. Check Employees
        const employee = await Employees.findOne({
            recovery_token: token,
            recovery_token_expires: { $gt: new Date() }
        });

        if (employee) {
            employee.password = newPassword;
            employee.recovery_token = null;
            employee.recovery_token_expires = null;
            await employee.save();
            return { message: "Password reset successfully" };
        }

        // 2. Check Clients
        const client = await Clients.findOne({
            recovery_token: token,
            recovery_token_expires: { $gt: new Date() }
        });

        if (client) {
            client.password = newPassword;
            client.recovery_token = null;
            client.recovery_token_expires = null;
            await client.save();
            return { message: "Password reset successfully" };
        }

        const error = new Error("The recovery token is invalid or has expired");
        error.status = 400;
        throw error;
    }
};

export default RecoveryPasswordService;
