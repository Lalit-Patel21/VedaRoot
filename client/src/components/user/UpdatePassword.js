// import axios from "axios";
// import { useState } from "react";
// import Api from "../../apis/Api";
// import Header from "../header/Header";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// export default function UpdatePassword() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const handleSubmit = async (event) => {
//     try {
//       event.preventDefault();
//       let response = await axios.post(Api.UPDATE_PASSWORD, {
//         email,
//       });
//       console.log(response.data);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       toast.error("Invalid user");
//     }
//   };
//   return (
//     <>
//       <ToastContainer />
//       <div
//         className="container d-flex justify-content-center align-items-center mt-5"
//         style={{ height: "70vh" }}
//       >
//         <div
//           className="card shadow-lg"
//           style={{ maxWidth: "400px", width: "100%" }}
//         >
//           <h3 className="bg-success text-white text-center p-3">
//             Update Password
//           </h3>
//           <form className="p-4" onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter your email"
//                 className="form-control"
//                 onChange={(event) => setEmail(event.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group mb-3">
//               <label htmlFor="password" className="form-label">
//                 old Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter old password"
//                 className="form-control"
//                 onChange={(event) => setPassword(event.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group mb-3">
//               <label htmlFor="cpassword" className="form-label">
//                 New Password
//               </label>
//               <input
//                 type="cpassword"
//                 id="cpassword"
//                 placeholder="Enter New Password "
//                 className="form-control"
//                 onChange={(event) => setPassword(event.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group mb-4">
//               <button type="submit" className="btn btn-primary w-100">
//                 Update Password
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import Api from "../../apis/Api";

export default function ChangePasswordU() {
  const { profile } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const data = {
      id: profile._id,
      oldpassword: oldPassword,
      newpassword: newPassword,
    };

    try {
      const response = await axios.patch(Api.UPDATE_PASSWORD, data);
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Error updating password. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h1 className="bg-success text-white text-center mt-5 p-2">
          Change Password
        </h1>
      </div>
      <div className="container mt-5 ">
        <h1></h1>
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Change Password
          </button>
        </form>
      </div>
    </>
  );
}
