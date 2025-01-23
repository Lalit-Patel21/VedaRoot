// import Header from "../header/Header";
// export default function DoctorConsult() {
//   return (
//     <>
//       <Header />
//       <div className="container - mt-5">
//         <h1 bg-success text-white text-center p-3>
//           DoctorConsult component...
//         </h1>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../../apis/Api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
// import "./Consultant.css"; // Import CSS file

export default function Consultant() {
  const doctorId = useSelector((state) => state.profile.profile._id);
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    fetchConsultations();
  }, [doctorId]);

  const fetchConsultations = async () => {
    try {
      const response = await axios.get(
        `${Api.GET_DOCTOR_CONSULTATIONS}/${doctorId}`
      );
      setConsultations(response.data);
    } catch (error) {
      console.error("Error fetching consultations:", error);
      toast.error("Failed to fetch consultations. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <h1 className="mb-4">Your Consultations</h1>
        {consultations.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Phone Number</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation) => (
                <tr key={consultation._id}>
                  <td>{consultation.name}</td>
                  <td>{consultation.phoneNo}</td>
                  <td>{consultation.message}</td>
                  <td>
                    {new Date(
                      consultation.consultationDate
                    ).toLocaleDateString()}
                  </td>
                  <td>{consultation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No consultations found.</p>
        )}
      </div>
    </>
  );
}
