import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Api from "../../apis/Api";

export default function ViewProfileU() {
  const [userProfile, setUserProfile] = useState(null);
  const { isLoggedIn, profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isLoggedIn) {
      loadUserProfile();
    }
  }, [isLoggedIn]);

  const loadUserProfile = async () => {
    try {
      let response = await axios.get(Api.GET_USER_BY_ID + `/${profile._id}`);
      setUserProfile(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load user profile. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <h1 className="bg-success text-white text-center p-3 mt-5">
          User Profile
        </h1>
        {userProfile ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>
              <p className="card-text">
                <strong>Name: </strong> {userProfile.userName}
              </p>
              <p className="card-text">
                <strong>Email: </strong> {userProfile.email}
              </p>
              <p className="card-text">
                <strong>Contact Number: </strong> {userProfile.contactNumber}
              </p>
              <p className="card-text">
                <strong>Address : </strong> {userProfile.address}
              </p>
              <p className="card-text">
                <strong>City : </strong> {userProfile.city}
              </p>
              <p className="card-text">
                <strong>State: </strong> {userProfile.state}
              </p>
              <p className="card-text">
                <strong>PinCode: </strong> {userProfile.pinCode}
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
