import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux-config/ProfileSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import MyProfile from "./View-ProfileU";
import UpdateProfileU from "./UpdateProfileU";
import MyOrder from "../order/ViewOrder";
import UpdatePassword from "./UpdatePassword";
import MyAppointment from "./ViewAppoitmentU";
import MyConsultant from "./ViewConsultantU";
import "./UserDashBoard.css";

export default function UserDashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const [activeComponent, setActiveComponent] = useState("myprofile"); // Declare activeComponent state
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
      toast.error("Failed to load User profile. Please try again.");
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "myprofile":
        return <MyProfile />;
      case "myorder":
        return <MyOrder />;
      case "myappoitment":
        return <MyAppointment />;
      case "myconsultant":
        return <MyConsultant />;
      case "updatepassword":
        return <UpdatePassword />;
      case "updateprofileu":
        return <UpdateProfileU />;
      default:
        return <MyProfile />;
    }
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(signOut());
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
                  src={userProfile?.profileImage || "path/to/user-logo.jpg"}
                  className="rounded-circle img-fluid"
                  alt="user Profile"
                  width="150"
                  height="150"
                />
                <h5 className="card-title mt-3">{userProfile?.userName}</h5>
                <div className="list-group">
                  <Link
                    onClick={() => setActiveComponent("myprofile")}
                    to="#"
                    className={`list-group-item list-group-item-action custom-link ${
                      activeComponent === "myprofile" ? "active" : ""
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("myorder")}
                    to="#"
                    className={`list-group-item list-group-item-action custom-link ${
                      activeComponent === "myorder" ? "active" : ""
                    }`}
                  >
                    Orders
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("myappoitment")}
                    to="#"
                    className={`list-group-item list-group-item-action custom-link ${
                      activeComponent === "myappoitment" ? "active" : ""
                    }`}
                  >
                    Appointments
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("myconsultant")}
                    to="#"
                    className={`list-group-item list-group-item-action custom-link ${
                      activeComponent === "myconsultant" ? "active" : ""
                    }`}
                  >
                    Consultant
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("updateprofileu")}
                    to="#"
                    className={`list-group-item list-group-item-action custom-link ${
                      activeComponent === "updateprofileu" ? "active" : ""
                    }`}
                  >
                    Update Profile
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("updatepassword")}
                    to="#"
                    className={`list-group-item list-group-item-action custom-link ${
                      activeComponent === "updatepassword" ? "active" : ""
                    }`}
                  >
                    Update Password
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action custom-link"
                    onClick={handleLogout}
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
