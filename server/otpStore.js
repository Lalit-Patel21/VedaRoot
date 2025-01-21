import otpGenerator from "otp-generator";

const otpStore = new Map();

export const generateOTP = (email) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

  otpStore.set(email, { otp, otpExpiry });
  return otp;
};

export const verifyOTP = (email, otp) => {
  const otpData = otpStore.get(email);

  if (!otpData) {
    throw new Error("OTP not found");
  }

  if (otpData.otp !== otp || otpData.otpExpiry < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  otpStore.delete(email);
  return true;
};
