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
  const { isLoggedIn, profile } = useSelector((state) => state.profile);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      let response = await axios.get(
        Api.GET_PRODUCT_FROM_CART + `/${profile._id}`
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
        userId: profile._id,
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
          userId: profile._id,
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

  // const navigateToBuyNow = (product) => {
  //   navigate(`/buy-now`, { state: { product } });
  // };

  const navigateToRemoveFromCart = async (productId) => {
    try {
      let response = await axios.post(Api.REMOVE_PRODUCT_FROM_CART, {
        userId: profile._id,
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
    navigate(`/buy-now`, { state: { cartItems: cartList } });
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
