import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    // Simulating payment process
    setTimeout(() => {
      toast.success("Payment successful!");
      //   navigate("/order-summary"); // Navigate to order summary or home page
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-4">
        <h2 className=" p-2">Select Payment Method</h2>
        <form className="mb-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="creditCard"
              value="Credit Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="creditCard">
              Credit Card
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="debitCard"
              value="Debit Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="debitCard">
              Debit Card
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="netBanking"
              value="Net Banking"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="netBanking">
              Net Banking
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="upi"
              value="UPI"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="upi">
              UPI
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="cod"
              value="Cash on Delivery"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="cod">
              Cash on Delivery
            </label>
          </div>
          <button
            type="button"
            className="btn btn-success mt-3"
            onClick={handlePayment}
          >
            Pay
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
