import { validationResult } from "express-validator";
import AdminService from "../services/admin.services.js";

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminService.getAllAdminsService();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await AdminService.getAdminByIdService(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new admin
export const createAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const adminData = req.body;

  try {
    const newAdmin = await AdminService.createAdminService(adminData);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an admin
export const updateAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedAdmin = await AdminService.updateAdminService(
      req.params.id,
      req.body
    );
    if (!updatedAdmin)
      return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await AdminService.deleteAdminService(req.params.id);
    if (!deletedAdmin)
      return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin sign-in
export const signInAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { token, admin } = await AdminService.signInAdminService(
      email,
      password
    );
    res.status(200).json({ message: "Admin signed in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot password
export const forgotpassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  try {
    const result = await AdminService.forgotpassword(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await AdminService.verifyOTP(email, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set new password
export const setnewpassword = async (req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const result = await AdminService.setnewpassword(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update password
export const updatepassword = async (req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, oldpassword, newpassword } = req.body;
  try {
    const result = await AdminService.updatepassword(
      id,
      oldpassword,
      newpassword
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View admin by email
export const listbyemail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  try {
    const admin = await AdminService.listbyemail(email);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View admin by ID
export const ViewAdminById = async (req, res) => {
  const { id } = req.body;
  try {
    const admin = await AdminService.viewAdminById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View admin list
export const list = async (req, res) => {
  try {
    const admins = await AdminService.list();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
