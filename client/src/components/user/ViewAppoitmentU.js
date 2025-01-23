// export default function ViewAppointmentU() {
//   return (
//     <>
//       <div className="container bg-success text-white text-center p-3 mt-5">
//         <h1>ViewAppointmentU component...</h1>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../../apis/Api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
// import "./ViewAppointment.css"; // Import CSS file

export default function ViewAppointment() {
  const { isLoggedIn, profile } = useSelector((state) => state.profile);
  console.log(profile._id);

  const userId = useSelector((state) => state.profile.profile._id);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${Api.GET_USER_APPOITMENT}/${userId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <h1 className="mb-4 text-center bg-success mt-4 p-3 text-white rounded">
          Your Appointments
        </h1>
        {appointments.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.phoneNo}</td>
                  <td>{appointment.email}</td>
                  <td>
                    {new Date(
                      appointment.appointmentDateTime
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(
                      appointment.appointmentDateTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </>
  );
}
