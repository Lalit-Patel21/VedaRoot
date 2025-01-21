import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Api from "../../apis/Api";
import Header from "../header/Header";
import { ToastContainer, toast } from "react-toastify";

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setOtpExpired(true);
    }
  }, [timer]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (otpExpired) {
        toast.error("OTP has expired. Please request a new one.");
        return;
      }
      let response = await axios.post(Api.VERIFY_OTP_DOCTOR, { email, otp });
      console.log(response.data);
      toast.success("OTP verified successfully");
      navigate("/docsetnewpassword", { state: { email } });
    } catch (err) {
      console.log(err);
      toast.error("Invalid or expired OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      let response = await axios.post(Api.FORGATE_PASSWORD_DOCTOR, { email });
      console.log(response.data);
      toast.success("OTP resent successfully");
      setTimer(120); // Reset timer to 2 minutes
      setOtpExpired(false); // Reset OTP expired status
    } catch (err) {
      console.log(err);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div
          className="card shadow-lg"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="bg-success text-white text-center p-3">Verify OTP</h3>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="otp" className="form-label">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                className="form-control"
                onChange={(event) => setOtp(event.target.value)}
                disabled={otpExpired}
                required
              />
            </div>
            {otpExpired && (
              <div className="text-danger text-center mb-3">
                OTP has expired. Please request a new one.
              </div>
            )}
            <div className="form-group mb-4">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={otpExpired}
              >
                Verify OTP
              </button>
            </div>
          </form>
          {otpExpired && (
            <div className="text-center">
              <button className="btn btn-link" onClick={handleResendOtp}>
                Resend OTP
              </button>
            </div>
          )}
          {!otpExpired && (
            <div className="text-center text-secondary">
              {`Time remaining: ${Math.floor(timer / 60)}:${String(
                timer % 60
              ).padStart(2, "0")}`}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
