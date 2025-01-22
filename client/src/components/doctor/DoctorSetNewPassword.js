import axios from "axios";
import { useState } from "react";
import Api from "../../apis/Api";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function SetNewPassword() {
  const location = useLocation();
  const { email } = location.state || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkPasswordsMatch(event.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    checkPasswordsMatch(password, event.target.value);
  };

  const checkPasswordsMatch = (password, confirmPassword) => {
    setPasswordsMatch(password === confirmPassword);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!passwordsMatch) {
        toast.error("Passwords do not match. Please try again.");
        return;
      }

      let response = await axios.patch(Api.SET_NEW_PASSWORD_DOCTOR, {
        email,
        password,
      });
      console.log(response.data);
      toast.success("Set new password successfully");
      navigate("/signInD");
    } catch (err) {
      console.log(err);
      toast.error("Error in setting new password");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="card shadow-lg"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="bg-success text-white text-center p-3">
            SET NEW PASSWORD
          </h3>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="form-control"
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm Your Password"
                className="form-control"
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            {!passwordsMatch && (
              <div className="text-danger text-center">
                Passwords do not match. Please try again.
              </div>
            )}
            <div className="form-group mb-4">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={!passwordsMatch}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />;
    </>
  );
}
