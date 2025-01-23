import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../../apis/Api";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const DoctorAppointment = () => {
  const params = useParams();
  const userId = useSelector((state) => state.profile.profile._id);
  console.log("UserId ", userId);
  console.log("Doctor Id from appointment", params.id);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchDoctorDetails();
  }, [params.id]);

  useEffect(() => {
    if (appointmentDate) {
      fetchAvailableTimes();
    }
  }, [appointmentDate]);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`${Api.GET_Doctor_BY_ID}/${params.id}`);
      setDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      toast.error("Failed to fetch doctor details.");
    }
  };

  const fetchAvailableTimes = () => {
    const times = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
    ];
    setAvailableTimes(times);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const appointmentDateTime = new Date(
        appointmentDate + "T" + appointmentTime
      );
      if (isNaN(appointmentDateTime.getTime())) {
        throw new Error("Invalid date or time");
      }

      const appointmentData = {
        userId: userId,
        doctorId: params.id,
        appointmentDateTime: appointmentDateTime.toISOString(),
        status: "Pending",
        phoneNo,
        name,
        age,
        gender,
        email,
      };

      await axios.post(Api.BOOK_APPOITMENT, appointmentData);
      toast.success("Appointment booked successfully!");

      // Clear form data after successful submission
      setAppointmentDate("");
      setAppointmentTime("");
      setName("");
      setEmail("");
      setPhoneNo("");
      setAge("");
      setGender("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("There was an error booking the appointment!");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <ToastContainer />
        <h2 className="text-center bg-success mt-4 p-3 text-white rounded">
          Book an Appointment
        </h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="phoneNo">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="gender">Gender:</label>
              <select
                className="form-control"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="appointmentDate">Select Date:</label>
              <input
                type="date"
                className="form-control"
                id="appointmentDate"
                value={appointmentDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="appointmentTime">Select Time Slot:</label>
              <select
                className="form-control"
                id="appointmentTime"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              >
                <option value="">Select</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Book Appointment
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default DoctorAppointment;
