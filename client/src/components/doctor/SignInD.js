import axios from "axios";
import { useState } from "react";
import Api from "../../apis/Api";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux-config/ProfileSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignInD() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let response = await axios.post(Api.SIGN_IND, { email, password });
      console.log(response.data);
      const profileData = response.data;
      dispatch(
        setProfile({
          profile: profileData.doctor,
          token: profileData.token,
          role: "doctor",
        })
      );
      // dispatch(setProfile({ ...response.data, role: "doctor" }));
      if (response.status === 200) {
        toast.success("Sign in successfully");
        navigate("/doctordashboard");
      } else {
        toast.error("Failed to sign in");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid Doctor");
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="card shadow-lg"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="bg-success text-white text-center p-2">
            Doctor Sign In here
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
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <div className="container flex justify-content-around">
                <small className="form-text ">
                  <a href="/docforgatepassword" className="text-secondary">
                    Forgot Password?
                  </a>
                </small>
                <small>
                  Do not have an account
                  <a href="/signUpD" className="text-secondary ">
                    SignUp?
                  </a>
                </small>
              </div>
            </div>
            <div className="form-group mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
            </div>
            <div className="text-center mb-3">
              <span>or sign in with</span>
            </div>
            <div className="d-flex justify-content-around">
              <a
                href="/auth/google"
                className="btn btn-outline-danger w-45 d-flex align-items-center justify-content-center"
                style={{ width: "48%" }}
              >
                <i className="fab fa-google me-2"></i> Google
              </a>
              <a
                href="/auth/github"
                className="btn btn-outline-dark w-45 d-flex align-items-center justify-content-center"
                style={{ width: "48%" }}
              >
                <i className="fab fa-github me-2"></i> GitHub
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
