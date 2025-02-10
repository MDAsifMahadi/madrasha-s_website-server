const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Admin} = require("../models/schemaModels");

const SECRET_KEY = "your_secret_key"; // JWT টোকেনের জন্য সিক্রেট কী

const adminHandler = {};

// 🔵 সাইনআপ হ্যান্ডলার
adminHandler.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ইমেইল আগে থেকে আছে কিনা চেক করা
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "এই ইমেইল ইতিমধ্যে নিবন্ধিত!" });
        }

        // পাসওয়ার্ড এনক্রিপ্ট করা
        const hashedPassword = await bcrypt.hash(password, 10);

        // নতুন ইউজার তৈরি
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "সাইনআপ সফল হয়েছে!" });
    } catch (error) {
        res.status(500).json({ message: "সাইনআপ করতে ব্যর্থ!", error });
    }
};

// 🔴 লগইন হ্যান্ডলার
adminHandler.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ইউজার খুঁজে বের করা
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "ইমেইল পাওয়া যায়নি!" });
        }

        // পাসওয়ার্ড মিলিয়ে দেখা
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "পাসওয়ার্ড ভুল!" });
        }

        // JWT টোকেন তৈরি
        const token = jwt.sign({ id: admin._id, email: admin.email }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "লগইন সফল!", token });
    } catch (error) {
        res.status(500).json({ message: "লগইন করতে ব্যর্থ!", error });
    }
};

// 🟡 ইউজার আপডেট হ্যান্ডলার (পাসওয়ার্ড পরিবর্তন)
adminHandler.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        // ইউজার খুঁজে বের করা
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "ইউজার পাওয়া যায়নি!" });
        }

        // নতুন পাসওয়ার্ড এনক্রিপ্ট করে আপডেট করা
        if (newPassword) {
            admin.password = await bcrypt.hash(newPassword, 10);
        }

        await admin.save();
        res.status(200).json({ message: "পাসওয়ার্ড আপডেট হয়েছে!" });
    } catch (error) {
        res.status(500).json({ message: "আপডেট করতে ব্যর্থ!", error });
    }
};

module.exports = adminHandler;
