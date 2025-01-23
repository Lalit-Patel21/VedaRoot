import axios from "axios";
import { useState } from "react";
import Api from "../../apis/Api";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let response = await axios.post(Api.UPDATE_PASSWORD, {
        email,
      });
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Invalid user");
    }
  };
  return (
    <>
      <ToastContainer />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div
          className="card shadow-lg"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="bg-success text-white text-center p-3">
            Update Password
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
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                old Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter old password"
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="cpassword" className="form-label">
                New Password
              </label>
              <input
                type="cpassword"
                id="cpassword"
                placeholder="Enter New Password "
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <button type="submit" className="btn btn-success w-100">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
