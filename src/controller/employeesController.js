import mongoose from "mongoose";
import Employees from "../models/employees.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllEmployees = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.role) {
            query.role = req.query.role;
        }
        if (req.query.status) {
            query.status = req.query.status;
        }

        const employees = await Employees.find(query).select("-password");
        return res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        next(error);
    }
};

export const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID format"
            });
        }

        const employee = await Employees.findById(id).select("-password");
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

export const createEmployee = async (req, res, next) => {
    try {
        const { name, email, password, role, hire_date, salary, status, image, public_id } = req.body;

        // Validations
        if (!name || !name.trim() || !email || !email.trim() || !password || !role || !hire_date || !status) {
            return res.status(400).json({
                success: false,
                message: "name, email, password, role, hire_date, and status are required fields"
            });
        }

        if (salary === undefined || salary === null || isNaN(salary) || salary <= 0) {
            return res.status(400).json({
                success: false,
                message: "Salary is required and must be greater than 0"
            });
        }

        // Email duplicate check
        const existing = await Employees.findOne({ email });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered by another employee"
            });
        }

        const employee = new Employees({
            name,
            email,
            password,
            role,
            hire_date,
            salary: Number(salary),
            status,
            image: image || "",
            public_id: public_id || ""
        });

        await employee.save();

        const data = employee.toObject();
        delete data.password;

        return res.status(201).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};

export const updateEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID format"
            });
        }

        const { name, email, password, role, hire_date, salary, status, image, public_id } = req.body;

        const employee = await Employees.findById(id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Handle email unique constraint if changing email
        if (email && email.trim() !== employee.email) {
            const existing = await Employees.findOne({ email });
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: "Email is already registered by another user"
                });
            }
            employee.email = email;
        }

        if (name && name.trim()) employee.name = name;
        if (password) employee.password = password; // pre-save will hash
        if (image !== undefined) employee.image = image;
        if (public_id !== undefined) employee.public_id = public_id;

        // Only Admins can change role, status or salary (prevents self-escalation
        // when an employee updates their own record via selfOrRoles)
        if (req.user.role === "Admin") {
            if (role) employee.role = role;
            if (status) employee.status = status;

            if (salary !== undefined && salary !== null) {
                if (isNaN(salary) || salary <= 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Salary must be greater than 0"
                    });
                }
                employee.salary = Number(salary);
            }
        }

        if (hire_date) employee.hire_date = hire_date;

        await employee.save();

        const data = employee.toObject();
        delete data.password;

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID format"
            });
        }

        const employee = await Employees.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
