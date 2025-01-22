// import Header from "../header/Header";
// import Footer from "../footer/Footer";

// export default function ViewProfileD() {
//   return (
//     <>
//       <Header />

//       <div className="container - mt-5">
//         <h1>ViewProfileD component...</h1>
//         <Footer />;
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Api from "../../apis/Api";

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
        <h1 className="text-center mb-4">Doctor Profile</h1>
        {doctorProfile ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>
              <p className="card-text">
                <strong>Name: </strong> {doctorProfile.name}
              </p>
              <p className="card-text">
                <strong>Email: </strong> {doctorProfile.email}
              </p>
              <p className="card-text">
                <strong>Contact Number: </strong> {doctorProfile.contactNumber}
              </p>
              <p className="card-text">
                <strong>Registration Number : </strong>{" "}
                {doctorProfile.registrationNumber}
              </p>
              <p className="card-text">
                <strong> Specialization: </strong>
                {doctorProfile.specialization}
              </p>

              <p className="card-text">
                <strong>Address : </strong>{" "}
                {doctorProfile.details.clinicAddress}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading profile...</p>
        )}
      </div>
    </>
  );
}
//  details:
//     time: String,
//     qualification: String,
//     experience: Number,
//     clinicAddress: String,
//     consultationFee: Number,
//     availability: [String],
//     doctorimage: String,
//     gender: String,
//     bio: String,
