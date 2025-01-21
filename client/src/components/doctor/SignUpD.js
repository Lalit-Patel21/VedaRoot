// import axios from "axios";
// import Api from "../../apis/Api";
// import React, { useState } from "react";
// import Header from "../header/Header";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setDoctor } from "../../redux-config/DoctorSlice";

// const SignUpD = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     contactNumber: "",
//     address: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     gender: "",
//     specialization: "",
//     experience: "",
//     qualification: "",
//     registrationNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Form submitted: ", formData);
//       let response = await axios.post(Api.SIGN_UPD, formData);
//       console.log(response.data);
//       // dispatch(setDoctor(response.data));
//       navigate("/signInD");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Header />
//       <div className="container-fluid mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-8 col-lg-6">
//             <h2 className="text-center bg-success mb-2">Doctor SignUp</h2>
//             <form
//               onSubmit={handleSubmit}
//               className="p-4 border rounded bg-light"
//             >
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="name" className="form-label">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="email" className="form-label">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="contactNumber" className="form-label">
//                     Contact Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="contactNumber"
//                     name="contactNumber"
//                     value={formData.contactNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="specialization" className="form-label">
//                     Specialization
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="specialization"
//                     name="specialization"
//                     value={formData.specialization}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="experience" className="form-label">
//                     Experience (Years)
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="experience"
//                     name="experience"
//                     value={formData.experience}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="qualification" className="form-label">
//                     Qualification
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="qualification"
//                     name="qualification"
//                     value={formData.qualification}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="registrationNumber" className="form-label">
//                     Registration Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="registrationNumber"
//                     name="registrationNumber"
//                     value={formData.registrationNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="address" className="form-label">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="city" className="form-label">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="city"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="state" className="form-label">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="state"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="pinCode" className="form-label">
//                     Pin Code
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="pinCode"
//                     name="pinCode"
//                     value={formData.pinCode}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="gender" className="form-label">
//                   Gender
//                 </label>
//                 <select
//                   className="form-select"
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <button type="submit" className="btn btn-primary w-100 py-2">
//                 Sign Up
//               </button>
//               <div className="mt-2">
//                 <small>
//                   Already have an account?{" "}
//                   <a href="/signInD" className="text-secondary">
//                     SignIn?
//                   </a>
//                 </small>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUpD;

import axios from "axios";
import Api from "../../apis/Api";
import React, { useState } from "react";
import Header from "../header/Header";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDoctor } from "../../redux-config/DoctorSlice";

const SignUpD = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    gender: "",
    specialization: "",
    experience: "",
    qualification: "",
    registrationNumber: "",
    details: {
      time: "",
      qualification: "",
      experience: "",
      clinicAddress: "",
      consultationFee: "",
      availability: [],
      doctorimage: "",
      gender: "",
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
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted: ", formData);
      let response = await axios.post(Api.SIGN_UPD, formData);
      console.log(response.data);
      // dispatch(setDoctor(response.data));
      navigate("/signInD");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container-fluid mt-5">
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
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="qualification" className="form-label">
                    Qualification
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
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
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
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
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
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
                  required
                />
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
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="availability" className="form-label">
                  Availability
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="availability"
                  name="details.availability"
                  value={formData.details.availability.join(",")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        availability: e.target.value.split(","),
                      },
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="doctorimage" className="form-label">
                  Doctor Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="doctorimage"
                  name="details.doctorimage"
                  value={formData.details.doctorimage}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <textarea
                  className="form-control"
                  id="bio"
                  name="details.bio"
                  value={formData.details.bio}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2">
                Sign Up
              </button>
              <div className="mt-2">
                <small>
                  Already have an account?{" "}
                  <a href="/signInD" className="text-secondary">
                    SignIn?
                  </a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpD;
