import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Api from "../../apis/Api";
import "./ViewProfileD.css"; // Import CSS file for styling

export default function ViewProfileD() {
  const [doctorProfile, setDoctorProfile] = useState(null);
  const { isLoggedIn, profile } = useSelector((state) => state.profile);
  console.log(profile);

  useEffect(() => {
    if (isLoggedIn) {
      loadDoctorProfile();
    }
  }, [isLoggedIn]);

  const loadDoctorProfile = async () => {
    try {
      let response = await axios.get(Api.GET_Doctor_BY_ID + `/${profile._id}`);
      setDoctorProfile(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Doctor profile. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <h1 className="text-center mb-4 mb-4 bg-success text-white rounded">
          Doctor Profile
        </h1>
        {doctorProfile ? (
          <div className="card shadow-sm mx-auto profile-card">
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong>Name:</strong> {doctorProfile.name}
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Email:</strong> {doctorProfile.email}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong>Contact Number:</strong> {doctorProfile.contactNumber}
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Registration Number:</strong>{" "}
                  {doctorProfile.registrationNumber}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong>Specialization:</strong>{" "}
                  {doctorProfile.specialization}
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Address:</strong>{" "}
                  {doctorProfile.details.clinicAddress}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong>Qualification:</strong>{" "}
                  {doctorProfile.details.qualification}
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Experience:</strong>{" "}
                  {doctorProfile.details.experience} years
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <strong>Bio:</strong> {doctorProfile.details.bio}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading profile...</p>
        )}
      </div>
    </>
  );
}
