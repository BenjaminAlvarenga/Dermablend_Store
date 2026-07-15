import Clients from "../models/clients.js";
import Employees from "../models/employees.js";
import { generateToken } from "./login.service.js";

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
    }
};

export default RegisterService;
