import { Doctor } from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import { generateOTP, verifyOTP } from "../otpStore.js";
import { sendMail } from "../mailer.config.js";

class DoctorService {
  static async createDoctor(doctorData) {
    try {
      const newDoctor = new Doctor(doctorData);
      return await newDoctor.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllDoctors() {
    try {
      return await Doctor.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getDoctorById(id) {
    try {
      return await Doctor.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateDoctor(id, doctorData) {
    try {
      return await Doctor.findByIdAndUpdate(id, doctorData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteDoctor(id) {
    try {
      return await Doctor.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addDoctorRating(id, ratingData) {
    try {
      const doctor = await Doctor.findById(id);
      doctor.ratings.reviews.push(ratingData);
      doctor.ratings.averageRating =
        doctor.ratings.reviews.reduce((sum, review) => sum + review.rating, 0) /
        doctor.ratings.reviews.length;
      return await doctor.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findDoctorByEmail(email) {
    try {
      return await Doctor.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async signInDoctor(email, password) {
    try {
      const doctor = await this.findDoctorByEmail(email);
      if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
        throw new Error("Invalid email or password");
      }
      return doctor;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // static async signInDoctor(email, password) {
  //   try {
  //     const doctor = await Doctor.findOne({ email });
  //     if (!doctor) {
  //       throw new Error("Invalid email or password");
  //     }

  //     const isMatch = await bcrypt.compare(password, doctor.password);
  //     if (!isMatch) {
  //       throw new Error("Invalid email or password");
  //     }

  //     const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
  //       expiresIn: "1h",
  //     });
  //     return { token, doctor };
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  static async updatePassword(id, oldPassword, newPassword) {
    try {
      const doctor = await Doctor.findById(id);
      if (!doctor || !(await bcrypt.compare(oldPassword, doctor.password))) {
        throw new Error("Invalid old password");
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      doctor.password = hashedNewPassword;
      return await doctor.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async generateAndSendOTP(email) {
    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        throw new Error("Doctor not found");
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
      return await Doctor.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default DoctorService;
