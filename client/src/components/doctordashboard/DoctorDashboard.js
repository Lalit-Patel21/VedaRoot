import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux-config/ProfileSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import Appointment from "./ViewAppointment";
import Consultant from "./ViewConsultant";
import MyProfile from "../doctor/ViewProfileD";
import UpdateProfile from "./UpdateProfileD";
import "./DoctorDashBoard.css"; // Import CSS file

export default function DoctorDashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [activeComponent, setActiveComponent] = useState("appointment");
  const { isLoggedIn, profile } = useSelector((state) => state.profile);

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

  const renderComponent = () => {
    switch (activeComponent) {
      case "appointment":
        return <Appointment />;
      case "consultant":
        return <Consultant />;
      case "my-profile":
        return <MyProfile />;
      case "update-profile":
        return <UpdateProfile />;
      default:
        return <Appointment />;
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
                    onClick={() => setActiveComponent("appointment")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    Appointment
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("consultant")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    Consultant
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("my-profile")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    My Profile
                  </Link>
                  <Link
                    onClick={() => setActiveComponent("update-profile")}
                    to="#"
                    className="list-group-item list-group-item-action custom-link"
                  >
                    Update Profile
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
