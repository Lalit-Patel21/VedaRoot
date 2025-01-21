import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
// import { sendEmail } from "../config/mailerConfig.js";
import bcrypt from "bcrypt";
import { generateOTP, verifyOTP } from "../otpStore.js";
import { sendMail } from "../mailer.config.js";

class UserService {
  static async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = new User({ ...userData, password: hashedPassword });
      return await newUser.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateUser(id, userData) {
    try {
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      return await User.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async signInUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async generateAndSendOTP(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const otp = generateOTP(email);
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
      };

      await sendMail(mailOptions);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async verifyOTP(email, otp) {
    try {
      return verifyOTP(email, otp);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async setNewPassword(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // static async forgotPassword(email) {
  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) throw new Error("User not found");

  //     const otp = crypto.randomInt(100000, 999999).toString();
  //     user.otpInfo = { code: otp, expiry: Date.now() + 3600000 };
  //     await user.save();
  //     console.log("OTP saved:", user.otpInfo);

  //     await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);
  //     return { message: "OTP sent to email" };
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  // static async verifyOTP(email, otp) {
  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) throw new Error("User not found");

  //     const { code, expiry } = user.otpInfo || {};
  //     console.log("Retrieved OTP info:", { code, expiry });

  //     if (code !== otp || expiry < Date.now()) {
  //       throw new Error("OTP is invalid or has expired");
  //     }

  //     return { message: "OTP verified" };
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  // static async setNewPassword(email, password) {
  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) throw new Error("User not found");

  //     const { expiry } = user.otpInfo || {};
  //     if (expiry < Date.now()) {
  //       throw new Error("OTP has expired, request a new one");
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     user.password = hashedPassword;
  //     user.otpInfo = null;
  //     await user.save();
  //     console.log("Password updated:", user);

  //     return { message: "Password updated successfully" };
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }
  static async updatePassword(id, oldPassword, newPassword) {
    try {
      const user = await User.findById(id);
      if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
        throw new Error("Invalid old password");
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateUserImage(id, imageUrl) {
    try {
      return await User.findByIdAndUpdate(id, { imageUrl }, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
