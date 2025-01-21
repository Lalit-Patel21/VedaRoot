import { Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import ViewMore from "./components/product/ViewMore";
import BuyNow from "./components/order/BuyNow";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";

import ForgatePassword from "./components/user/ForgatePassword";
import VerifyOtp from "./components/user/VerifyOtp";
import SetnewPassword from "./components/user/SetnewPassword";
import UpdatePassword from "./components/user/UpdatePassword.js";

import Doctor from "./components/doctor/Doctorr.js";
import SignInD from "./components/doctor/SignInD";
import SignUpD from "./components/doctor/SignUpD";

import DoctorForgatePassword from "./components/doctor/DoctorForgatePassword";
import DoctorVerifyOTP from "./components/doctor/DoctorVerifyOTP";
import DoctorSetNewPassword from "./components/doctor/DoctorSetNewPassword";
import DoctorUpdatePassword from "./components/doctor/DoctorUpdatePassword.js";

import Category from "./components/category/Category";
import ProductH from "./components/product/Product";
import ProductM from "./components/product/ProductM";
import YogaH from "./components/yoga/Yoga";
import YogaM from "./components/yoga/YogaM";
import GetStart from "./components/yoga/GetStart";
import Disease from "./components/disease/Disease";
import DiseaseDetails from "./components/disease/DiseaseDetails";
import HomeRemedyH from "./components/homeremedy/Homeremedy";
import HomeRemedyM from "./components/homeremedy/HomeRemedyMa.js";

import About from "./components/about/AboutUs";
import Contact from "./components/contact/Contact";
import ViewMoreHR from "./components/homeremedy/ViewMoreHR";
import AddToCart from "./components/product/AddToCart";
import ViewCart from "./components/cart/ViewCart";
import DoctorConsult from "./components/doctor/DoctorConsult.js";
import DoctorAppoitment from "./components/doctor/DoctorAppoitment.js";
import ViewProfileU from "./components/user/View-ProfileU.js";
import ViewProfileD from "./components/doctor/ViewProfileD.js";
import DoctorDashBoard from "./components/doctor/DoctorDashboard.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/producth" element={<ProductH />} />
        <Route path="/homeremedyh" element={<HomeRemedyH />} />
        <Route path="/yogam" element={<YogaM />} />
        <Route path="/productm" element={<ProductM />} />
        <Route path="/homeremedym" element={<HomeRemedyM />} />
        <Route path="/yogah" element={<YogaH />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/diseasedetails/:id" element={<DiseaseDetails />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/view-profileu" element={<ViewProfileU />} />
        <Route path="/view-profiled" element={<ViewProfileD />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/signInD" element={<SignInD />} />
        <Route path="/signUpD" element={<SignUpD />} />

        <Route path="/docforgatepassword" element={<DoctorForgatePassword />} />
        <Route path="/docverifyotp" element={<DoctorVerifyOTP />} />
        <Route path="/docsetnewpassword" element={<DoctorSetNewPassword />} />
        <Route path="/docupdatepassword" element={<DoctorUpdatePassword />} />

        <Route path="/consult/:id" element={<DoctorConsult />} />
        <Route path="/appointment/:id" element={<DoctorAppoitment />} />
        <Route path="/forgatepassword" element={<ForgatePassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/setnewpassword" element={<SetnewPassword />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/view-more/:id" element={<ViewMore />} />
        <Route
          path="/buy-now/:id"
          element={
            <Auth>
              <BuyNow />
            </Auth>
          }
        />
        <Route path="/add-to-cart/:id" element={<AddToCart />} />
        <Route
          path="view-cart"
          element={
            <Auth>
              <ViewCart />
            </Auth>
          }
        />
        <Route path="get-start/:id" element={<GetStart />} />
        <Route path="/view-morehr/:id" element={<ViewMoreHR />} />
        <Route path="/get-start/:id" element={<GetStart />} />
        <Route path="/yogam/get-start/:id" element={<GetStart />} />
        <Route path="/homeremedym/view-morehr/:id" element={<ViewMoreHR />} />
        <Route path="/doctordahboard" element={<DoctorDashBoard />} />
      </Routes>
    </>
  );
}

export default App;
