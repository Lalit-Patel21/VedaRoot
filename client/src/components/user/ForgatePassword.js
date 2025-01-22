import axios from "axios";
import { useState } from "react";
import Api from "../../apis/Api";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ForgatePassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let response = await axios.post(Api.FORGATE_PASSWORD, {
        email,
      });
      console.log(response.data);
      toast.success("sent otp successfully");
      navigate("/verifyotp", { state: { email } });
    } catch (err) {
      console.log(err);
      toast.error("otp not sent");
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
          <h3 className="bg-success text-white text-center p-3">
            Forget Password
          </h3>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <button type="submit" className="btn btn-primary w-100">
                SEND OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
