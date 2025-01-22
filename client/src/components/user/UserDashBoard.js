import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux-config/ProfileSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import MyProfile from "../user/View-ProfileU";
import UpdateProfileU from "./UpdateProfileU";
import "./DoctorDashBoard.css"; // Import CSS file
import UpdatePassword from "./UpdatePassword";

export default function UserDashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const { isLoggedIn, profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isLoggedIn) {
      loadUserProfile();
    }
  }, [isLoggedIn]);

  const loadUserProfile = async () => {
    try {
      let response = await axios.get(Api.GET_User_BY_ID + `/${profile._id}`);
      setUserProfile(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load User profile. Please try again.");
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "UpdateProfileU":
        return <UpdateProfileU />;
      case "myorder":
        return <MyOrder />;
      case "UpdatePassword":
        return <UpdatePassword />;
      case "MyProfile":
        return <MyProfile />;
      case "UpdateProfileU":
        return <UpdateProfileU />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <img
                  src={doctorProfile?.profileImage || "path/to/dummy-image.jpg"}
                  className="rounded-circle img-fluid"
                  alt="Doctor Profile"
                  width="150"
                  height="150"
                />
                <h5 className="card-title mt-3">{doctorProfile?.name}</h5>
                <div className="list-group">
                  <Link
                    onClick={() => setActiveComponent("")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    MyProfile
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("consultant")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    MyOrder
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("my-profile")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    MyAppoitment
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("update-profile")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    Update Profile
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("update-profile")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    Updated Password
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action custom-link"
                    onClick={() => {
                      dispatch(signOut());
                      navigate("/");
                    }}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">{renderComponent()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
