import { Admin } from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../config/mailerConfig.js";

class AdminService {
  static async getAllAdminsService() {
    try {
      return await Admin.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAdminByIdService(id) {
    try {
      return await Admin.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createAdminService(adminData) {
    try {
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      const newAdmin = new Admin({ ...adminData, password: hashedPassword });
      return await newAdmin.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateAdminService(id, adminData) {
    try {
      return await Admin.findByIdAndUpdate(id, adminData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteAdminService(id) {
    try {
      return await Admin.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async signInAdminService(email, password) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new Error("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, admin };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async forgotpassword(email) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) throw new Error("Admin not found");

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();

      // Save OTP in a nested object (for demonstration purposes)
      admin.otpInfo = { code: otp, expiry: Date.now() + 600000 }; // 10m = 10*60*1000
      await admin.save();
      console.log("OTP saved:", admin.otpInfo);

      // Send OTP email
      await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);

      return { message: "OTP sent to email" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async verifyOTP(email, otp) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) throw new Error("Admin not found");

      // Access nested object
      const { code, expiry } = admin.otpInfo || {};
      console.log("Retrieved OTP info:", { code, expiry });

      if (code !== otp || expiry < Date.now()) {
        throw new Error("OTP is invalid or has expired");
      }

      return { message: "OTP verified" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async setnewpassword(email, password) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) throw new Error("Admin not found");

      // Verify OTP is valid and not expired (for additional security)
      if (admin.otpExpiry < Date.now()) {
        throw new Error("OTP has expired, request a new one");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
      admin.otp = null; // Clear OTP after password is set
      admin.otpExpiry = null; // Clear OTP expiry after password is set
      await admin.save();

      return { message: "Password updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updatepassword(id, oldpassword, newpassword) {
    try {
      const admin = await Admin.findById(id);
      if (!admin) throw new Error("Admin not found");

      const isMatch = await bcrypt.compare(oldpassword, admin.password);
      if (!isMatch) throw new Error("Incorrect old password");

      const hashedPassword = await bcrypt.hash(newpassword, 10);
      admin.password = hashedPassword;
      await admin.save();

      return { message: "Password updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async listbyemail(email) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) throw new Error("Admin not found");
      return admin;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async viewAdminById(id) {
    try {
      const admin = await Admin.findById(id);
      if (!admin) throw new Error("Admin not found");
      return admin;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async list() {
    try {
      return await Admin.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AdminService;
