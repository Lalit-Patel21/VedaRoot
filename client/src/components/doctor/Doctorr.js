import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import "./Doctor.css"; // Ensure this is the updated CSS file
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Doctor() {
  const [doctorList, setDoctorList] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, profile } = useSelector((state) => state.profile);
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      let response = await axios.get(Api.LOAD_DOCTOR);
      console.log(response);
      console.log(response.data);
      setDoctorList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToConsult = (id) => {
    navigate(`/consult/${id}`);
  };
  const navigateToAppointment = (id) => {
    navigate(`/appointment/${id}`);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-2">
        <h1 className="heading text-center mt-2 mb-4">Doctors</h1>
        <div className="d-flex justify-content-center">
          <div className="col-md-8">
            {doctorList.map((doctor, index) => (
              <div key={index} className="card doctor-card mb-4">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={doctor.details.doctorimage}
                      alt="doctor image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{doctor.name}</h5>
                      <p className="card-text">
                        <strong>Specialization:</strong> {doctor.specialization}
                      </p>
                      <p className="card-text">
                        <strong>Experience:</strong> {doctor.details.experience}
                        years
                      </p>
                      <p className="card-text">
                        <strong>Qualification:</strong>
                        {doctor.details.qualification}
                      </p>
                      <p className="card-text">
                        <strong>Clinic Address:</strong>
                        {doctor.details.clinicAddress}
                      </p>
                      <p className="card-text">
                        <strong>Contact Number:</strong> {doctor.contactNumber}
                      </p>
                      <div className="btn-container mt-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigateToConsult(doctor._id)}
                        >
                          Consult
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => navigateToAppointment(doctor._id)}
                        >
                          Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Doctor;
