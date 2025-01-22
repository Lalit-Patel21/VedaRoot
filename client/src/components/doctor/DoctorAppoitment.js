import Header from "../header/Header";
export default function DoctorAppoitment() {
  return (
    <>
      <Header />
      <div className="container - mt-5">
        <h1>DoctorAppoitment component...</h1>
      </div>
    </>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const DoctorAppoitment = () => {
//   const { doctorId } = useParams(); // Get doctorId from route parameters
//   const userId = useSelector((state) => state.user.id); // Fetch userId from Redux store

//   const [formData, setFormData] = useState({
//     userId,
//     doctorId,
//     appointmentDateTime: "",
//     status: "Pending",
//     contactNumber: "",
//     name: "",
//     age: "",
//     gender: "",
//     email: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/appointment/", formData);
//       console.log("Appointment created successfully:", response.data);
//     } catch (error) {
//       console.error("There was an error creating the appointment:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* userId and doctorId fields are not shown in the form */}
//       <input
//         type="datetime-local"
//         name="appointmentDateTime"
//         value={formData.appointmentDateTime}
//         onChange={handleChange}
//         required
//       />
//       {/* <select name="status" value={formData.status} onChange={handleChange}>
//         <option value="Pending">Pending</option>
//         <option value="Confirmed">Confirmed</option>
//         <option value="Cancelled">Cancelled</option>
//       </select> */}
//       <input
//         type="text"
//         name="contactNumber"
//         value={formData.contactNumber}
//         onChange={handleChange}
//         placeholder="contactNumber"
//       />
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Name"
//       />
//       <input
//         type="number"
//         name="age"
//         value={formData.age}
//         onChange={handleChange}
//         placeholder="Age"
//       />
//       <input
//         type="text"
//         name="gender"
//         value={formData.gender}
//         onChange={handleChange}
//         placeholder="Gender"
//       />
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//       />
//       <button type="submit">Create Appointment</button>
//     </form>
//   );
// };

// export default DoctorAppoitment;
