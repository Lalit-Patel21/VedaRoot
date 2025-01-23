import axios from "axios";
import Api from "../../apis/Api";
import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUpD = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    registrationNumber: "",
    specialization: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    gender: "",

    // experience: "",
    // qualification: "",

    details: {
      time: "",
      qualification: "",
      experience: "",
      clinicAddress: "",
      consultationFee: "",
      availability: [],
      doctorimage: "",
      // gender: "",
      bio: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("details.")) {
      const detailsField = name.split(".")[1];
      setFormData({
        ...formData,
        details: { ...formData.details, [detailsField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted: ", formData);
      let response = await axios.post(Api.SIGN_UPD, formData);
      console.log(response.data);
      navigate("/signInD");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="text-center bg-success mb-2">Doctor SignUp</h2>
            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded bg-light"
            >
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="contactNumber" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="specialization" className="form-label">
                    Specialization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Enter your specialization"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="experience" className="form-label">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="experience"
                    name="details.experience"
                    value={formData.details.experience}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter your experience in years"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="qualification" className="form-label">
                    Qualification
                  </label>
                  <select
                    className="form-select"
                    id="qualification"
                    name="details.qualification"
                    value={formData.details.qualification}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Qualification</option>
                    <option value="BAMS">BAMS</option>
                    <option value="MD (Ayurveda)">MD (Ayurveda)</option>
                    <option value="PhD (Ayurveda)">PhD (Ayurveda)</option>
                    <option value="MBBS">PhD (Ayurveda)</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="registrationNumber" className="form-label">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter your registration number"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="pinCode" className="form-label">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="Enter your pin code"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="time"
                    name="details.time"
                    value={formData.details.time}
                    onChange={handleChange}
                    placeholder="Enter your availability time"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="clinicAddress" className="form-label">
                  Clinic Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="clinicAddress"
                  name="details.clinicAddress"
                  value={formData.details.clinicAddress}
                  onChange={handleChange}
                  placeholder="Enter your clinic address"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="consultationFee" className="form-label">
                  Consultation Fee
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="consultationFee"
                  name="details.consultationFee"
                  value={formData.details.consultationFee}
                  onChange={handleChange}
                  min="0"
                  placeholder="Enter your consultation fee"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2">
                Sign Up
              </button>
              <div className="mt-2">
                <small>
                  Already have an account?
                  <a href="/signInD" className="text-secondary">
                    SignIn?
                  </a>
                </small>
              </div>
              <div className="text-center mb-3">
                <span>or sign in with</span>
              </div>
              <div className="d-flex justify-content-around mb-3">
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
      </div>
      <Footer />;
    </>
  );
};

export default SignUpD;
