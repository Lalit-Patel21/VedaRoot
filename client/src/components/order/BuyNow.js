// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

// function BuyNow() {
//   const location = useLocation();
//   const [product, setProduct] = useState(null);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     if (location.state) {
//       if (location.state.product) {
//         setProduct(location.state.product);
//       } else if (location.state.cartItems) {
//         setCartItems(location.state.cartItems);
//       }
//     }
//   }, [location.state]);

//   const handlePurchase = () => {
//     // Handle purchase logic for single product or cart items
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="heading text-center mt-2 mb-4">Purchase</h1>
//       {product ? (
//         <div>
//           <h2>{product.title}</h2>
//           <p>Price: {product.price} Rs.</p>
//           {/* Display other product details */}
//           <button className="btn btn-primary" onClick={handlePurchase}>
//             Complete Purchase
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h2>Cart Items</h2>
//           {cartItems.map((item, index) => (
//             <div key={index}>
//               <h3>{item.productId.title}</h3>
//               <p>Price: {item.productId.price} Rs.</p>
//               <p>Quantity: {item.quantity}</p>
//               {/* Display other item details */}
//             </div>
//           ))}
//           <button className="btn btn-primary" onClick={handlePurchase}>
//             Complete Purchase
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BuyNow;

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Api from "../../apis/Api";
import "react-toastify/dist/ReactToastify.css";

function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({
    shippingAddress: "",
    city: "",
    state: "",
    fullName: "",
    userContact: "",
    pinCode: "",
  });
  const [errors, setErrors] = useState({});
  const { isLoggedIn, profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (location.state) {
      if (location.state.product) {
        setProduct(location.state.product);
      } else if (location.state.cartItems) {
        setCartItems(location.state.cartItems);
      }
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(userDetails).forEach((key) => {
      if (!userDetails[key]) {
        formErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleOrderCreation = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      const items = product
        ? [{ productId: product._id, quantity: 1, price: product.price }]
        : cartItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
          }));

      const totalAmount = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const orderData = {
        userId: profile._id,
        totalAmount,
        ...userDetails,
        items,
      };

      await axios.post(Api.ORDER, orderData);
      toast.success("Order created successfully!");
      navigate("/payment"); // Navigate to payment section
    } catch (err) {
      console.error(err);
      toast.error("Failed to create order. Please try again.");
    }
  };

  const calculateTotalPrice = () => {
    return product
      ? product.price
      : cartItems.reduce(
          (total, item) => total + item.productId.price * item.quantity,
          0
        );
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8 mb-4">
            <h2 className="heading mb-4 bg-success p-3 text-white">
              Shipping Details
            </h2>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={userDetails.fullName}
                    onChange={handleInputChange}
                  />
                  {errors.fullName && (
                    <small className="text-danger">{errors.fullName}</small>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userContact"
                    placeholder="Enter your contact number"
                    value={userDetails.userContact}
                    onChange={handleInputChange}
                  />
                  {errors.userContact && (
                    <small className="text-danger">{errors.userContact}</small>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Shipping Address</label>
                  <textarea
                    className="form-control"
                    name="shippingAddress"
                    placeholder="Enter your shipping address"
                    value={userDetails.shippingAddress}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.shippingAddress && (
                    <small className="text-danger">
                      {errors.shippingAddress}
                    </small>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="Enter your city"
                    value={userDetails.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && (
                    <small className="text-danger">{errors.city}</small>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder="Enter your state"
                    value={userDetails.state}
                    onChange={handleInputChange}
                  />
                  {errors.state && (
                    <small className="text-danger">{errors.state}</small>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Pin Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pinCode"
                    placeholder="Enter your pin code"
                    value={userDetails.pinCode}
                    onChange={handleInputChange}
                  />
                  {errors.pinCode && (
                    <small className="text-danger">{errors.pinCode}</small>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={handleOrderCreation}
              >
                Proceed to Pay
              </button>
            </form>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title bg-success p-2 text-white">
                  Order Summary
                </h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product ? (
                      <tr>
                        <td>{product.title}</td>
                        <td>1</td>
                        <td>{product.price} Rs.</td>
                      </tr>
                    ) : (
                      cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productId.title}</td>
                          <td>{item.quantity}</td>
                          <td>{item.productId.price} Rs.</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="2">Total Price</th>
                      <th>{calculateTotalPrice()} Rs.</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BuyNow;
