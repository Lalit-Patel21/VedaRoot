import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setProfile } from "../../redux-config/ProfileSlice";
import Api from "../../apis/Api";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UpdateProfileU() {
  const { profile, token, isLoggedIn } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States for profile information
  const [userName, setUserName] = useState(profile.userName || "");
  const [email, setEmail] = useState(profile.email || "");
  const [contactNumber, setContactNumber] = useState(
    profile.contactNumber || ""
  );

  useEffect(() => {
    setUserName(profile.userName || "");
    setEmail(profile.email || "");
    setContactNumber(profile.contactNumber || "");
  }, [profile]);

  // Handle saving profile changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const updatedData = { userName, email, contactNumber };

    try {
      // Prepare API call URL for updating the user profile
      const updateUrl = Api.UPDATE_USER.replace("{id}", profile._id);
      const response = await axios.patch(updateUrl, updatedData, {
        headers: { Authorization: `Bearer ${token} ` },
      });

      // Dispatch action to update Redux store
      dispatch(setProfile({ profile: response.data, token }));

      // Show success message
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h1 className="bg-success text-white text-center mt-5 p-2">
          Profile Information
        </h1>
      </div>
      <div className="user-profile">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              {isLoggedIn ? (
                <div className="card">
                  <div className="card-body">
                    {/* Edit Profile Form */}
                    <form onSubmit={handleSaveProfile}>
                      <div className="form-group">
                        <label htmlFor="userName">
                          <strong>Name:</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">
                          <strong>Email:</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contactNumber">
                          <strong>Contact Number:</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="contactNumber"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                        />
                      </div>

                      <div className="form-row">
                        <button type="submit" className="btn btn-success mr-2">
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => navigate("/")}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <p className="text-center">
                  Please log in to view your profile.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
