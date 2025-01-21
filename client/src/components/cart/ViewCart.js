// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Api from "../../apis/Api";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import Header from "../header/Header";
// import Footer from "../footer/Footer";

// function ViewCart() {
//   const [cartList, setViewCartList] = useState([]);
//   const navigate = useNavigate();
//   const { isLoggedIn, user } = useSelector((state) => state.User);

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const loadCart = async () => {
//     try {
//       let response = await axios.get(
//         Api.GET_PRODUCT_FROM_CART + `/${user._id}`
//       );
//       if (response.data && Array.isArray(response.data.items)) {
//         setViewCartList(response.data.items);
//       } else {
//         setViewCartList([]);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load cart items. Please try again.");
//     }
//   };

//   const handleIncrement = (index) => {
//     const updatedCartList = [...cartList];
//     updatedCartList[index].quantity += 1;
//     setViewCartList(updatedCartList);
//   };

//   const handleDecrement = (index) => {
//     const updatedCartList = [...cartList];
//     if (updatedCartList[index].quantity > 1) {
//       updatedCartList[index].quantity -= 1;
//     }
//     setViewCartList(updatedCartList);
//   };

//   const calculateTotalPrice = (product) => {
//     return product.productId.price * product.quantity;
//   };

//   const navigateToBuyNow = (id) => {
//     navigate(`/buy-now/${id}`);
//   };

//   const navigateToRemoveFromCart = async (productId) => {
//     try {
//       let response = await axios.post(Api.REMOVE_PRODUCT_FROM_CART, {
//         userId: user._id,
//         productId: productId,
//       });
//       if (response.status === 200) {
//         toast.success("Product removed from cart.");
//         loadCart(); // Reload the cart to update the list
//       } else {
//         toast.error("Failed to remove product from cart.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Header />
//       <div className="container mt-2">
//         <h1 className="heading text-center mt-2 mb-4">Cart</h1>
//         <div className="d-flex justify-content-center">
//           <div className="col-md-8">
//             {cartList.length === 0 ? (
//               <p className="text-center">Your cart is empty.</p>
//             ) : (
//               cartList.map((product, index) => (
//                 <div key={index} className="card doctor-card mb-4">
//                   <div className="row no-gutters">
//                     <div className="col-md-4">
//                       <img
//                         src={product.productId.imageUrl}
//                         alt="product image"
//                         className="img-fluid"
//                       />
//                     </div>
//                     <div className="col-md-8">
//                       <div className="card-body">
//                         <h5 className="card-title">
//                           {product.productId.title}
//                         </h5>
//                         <p className="card-text">
//                           <strong>Product Price: </strong>{" "}
//                           {product.productId.price} Rs.
//                         </p>
//                         <p className="card-text">
//                           <strong>Brand: </strong> {product.productId.brand}
//                         </p>
//                         <p className="card-text">
//                           <strong>Rating: </strong> {product.productId.rating}
//                         </p>
//                         <p className="card-text">
//                           <strong>Quantity: </strong>
//                           <button
//                             className="btn btn-sm btn-secondary mx-2"
//                             onClick={() => handleDecrement(index)}
//                           >
//                             -
//                           </button>
//                           {product.quantity}
//                           <button
//                             className="btn btn-sm btn-secondary mx-2"
//                             onClick={() => handleIncrement(index)}
//                           >
//                             +
//                           </button>
//                         </p>
//                         <p className="card-text">
//                           <strong>Total Price: </strong>{" "}
//                           {calculateTotalPrice(product)} Rs.
//                         </p>
//                         <div className="btn-container mt-3">
//                           <button
//                             className="btn btn-primary"
//                             onClick={() =>
//                               navigateToBuyNow(product.productId._id)
//                             }
//                           >
//                             Buy Now
//                           </button>
//                           <button
//                             className="btn btn-success"
//                             onClick={() =>
//                               navigateToRemoveFromCart(product.productId._id)
//                             }
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default ViewCart;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa"; // Import icons from react-icons

function ViewCart() {
  const [cartList, setViewCartList] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.User);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      let response = await axios.get(
        Api.GET_PRODUCT_FROM_CART + `/${user._id}`
      );
      if (response.data && Array.isArray(response.data.items)) {
        setViewCartList(response.data.items);
      } else {
        setViewCartList([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart items. Please try again.");
    }
  };

  const handleIncrement = async (index) => {
    const updatedCartList = [...cartList];
    updatedCartList[index].quantity += 1;

    try {
      await axios.patch(Api.UPDATE_PRODUCT_QTY, {
        userId: user._id,
        productId: updatedCartList[index].productId._id,
        quantity: updatedCartList[index].quantity,
      });
      setViewCartList(updatedCartList);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity. Please try again.");
    }
  };

  const handleDecrement = async (index) => {
    const updatedCartList = [...cartList];
    if (updatedCartList[index].quantity > 1) {
      updatedCartList[index].quantity -= 1;

      try {
        await axios.patch(Api.UPDATE_PRODUCT_QTY, {
          userId: user._id,
          productId: updatedCartList[index].productId._id,
          quantity: updatedCartList[index].quantity,
        });
        setViewCartList(updatedCartList);
      } catch (err) {
        console.error(err);
        toast.error("Failed to update quantity. Please try again.");
      }
    }
  };

  const calculateTotalPrice = (product) => {
    return product.productId.price * product.quantity;
  };

  const calculateTotalItems = () => {
    return cartList.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalBill = () => {
    return cartList.reduce(
      (total, item) => total + calculateTotalPrice(item),
      0
    );
  };

  const navigateToBuyNow = (id) => {
    navigate(`/buy-now/${id}`);
  };

  const navigateToRemoveFromCart = async (productId) => {
    try {
      let response = await axios.post(Api.REMOVE_PRODUCT_FROM_CART, {
        userId: user._id,
        productId: productId,
      });
      if (response.status === 200) {
        toast.success("Product removed from cart.");
        loadCart(); // Reload the cart to update the list
      } else {
        toast.error("Failed to remove product from cart.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleCheckout = () => {
    navigate(`/buy-now`);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-4">
        <h1 className="heading text-center mt-2 mb-4">Cart</h1>
        <div className="row">
          <div className="col-md-8 mb-4">
            {cartList.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartList.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={product.productId.imageUrl}
                          alt="product image"
                          className="img-fluid"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{product.productId.title}</td>
                      <td>{product.productId.price} Rs.</td>
                      <td>
                        <button
                          className="btn btn-sm btn-secondary mx-1"
                          onClick={() => handleDecrement(index)}
                        >
                          <FaMinus />
                        </button>
                        {product.quantity}
                        <button
                          className="btn btn-sm btn-secondary mx-1"
                          onClick={() => handleIncrement(index)}
                        >
                          <FaPlus />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            navigateToRemoveFromCart(product.productId._id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <p className="card-text">
                  <strong>Total Items: </strong> {calculateTotalItems()}
                </p>
                <p className="card-text">
                  <strong>Total Bill: </strong> {calculateTotalBill()} Rs.
                </p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewCart;
