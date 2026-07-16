import mongoose from "mongoose";
import Clients from "../models/clients.js";

// Helper to validate Mongo ID
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllClients = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.status) {
            query.status = req.query.status;
        }
        const clients = await Clients.find(query).select("-password");
        return res.status(200).json({
            success: true,
            count: clients.length,
            data: clients
        });
    } catch (error) {
        next(error);
    }
};

export const getClientById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid client ID format"
            });
        }

        const client = await Clients.findById(id).select("-password");
        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: client
        });
    } catch (error) {
        next(error);
    }
};

export const createClient = async (req, res, next) => {
    try {
        const { name, email, password, birthdate, phone, skin_type, skin_tone, favorites } = req.body;

        // String checks
        if (!name || !name.trim() || !email || !email.trim() || !password || !birthdate || !phone || !phone.trim() || !skin_type || !skin_type.trim() || !skin_tone || !skin_tone.trim()) {
            return res.status(400).json({
                success: false,
                message: "All mandatory client fields must be completed and cannot be empty"
            });
        }

        // Email duplicates check
        const existing = await Clients.findOne({ email });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        const client = new Clients({
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

        await client.save();

        const data = client.toObject();
        delete data.password;

        return res.status(201).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};

export const updateClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid client ID format"
            });
        }

        const { name, email, password, birthdate, phone, skin_type, skin_tone, favorites, is_verified, status } = req.body;

        const client = await Clients.findById(id);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        // Handle email unique constraint if changing email
        if (email && email.trim() !== client.email) {
            const existing = await Clients.findOne({ email });
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: "Email is already registered by another user"
                });
            }
            client.email = email;
        }

        // Update fields if provided
        if (name && name.trim()) client.name = name;
        if (password) client.password = password; // pre-save will hash
        if (birthdate) client.birthdate = birthdate;
        if (phone && phone.trim()) client.phone = phone;
        if (skin_type && skin_type.trim()) client.skin_type = skin_type;
        if (skin_tone && skin_tone.trim()) client.skin_tone = skin_tone;
        if (favorites !== undefined) client.favorites = favorites;

        // Only Admin/Employee can change verification or account status
        // (prevents a client from self-verifying or reactivating their own account)
        if (["Admin", "Employee"].includes(req.user.role)) {
            if (is_verified !== undefined) client.is_verified = is_verified;
            if (status) client.status = status;
        }

        await client.save();

        const data = client.toObject();
        delete data.password;

        return res.status(200).json({
            success: true,
            message: "Client updated successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

export const deleteClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid client ID format"
            });
        }

        const client = await Clients.findByIdAndDelete(id);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Client deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
