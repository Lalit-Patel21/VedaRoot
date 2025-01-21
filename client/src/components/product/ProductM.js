import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import "./Product.css"; // Ensure this is the updated CSS file
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Product() {
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.User);

  useEffect(() => {
    loadProducts();
    if (isLoggedIn) {
      loadCart();
    }
  }, [isLoggedIn]);

  const loadProducts = async () => {
    try {
      let response = await axios.get(Api.LOAD_PRODUCT);
      console.log(response);
      console.log(response.data);
      setProductList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCart = async () => {
    try {
      let response = await axios.get(
        Api.GET_PRODUCT_FROM_CART + `/${user._id}`
      );
      if (response.data && Array.isArray(response.data.items)) {
        setCartList(response.data.items);
      } else {
        setCartList([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navigateToBuyNow = (id) => {
    navigate(`/buy-now/${id}`);
  };

  const addProductToCart = (productId) => {
    if (isLoggedIn) {
      const isProductInCart = cartList.some(
        (item) => item.productId._id === productId
      );

      if (isProductInCart) {
        toast.error("Item already added to cart.");
      } else {
        axios
          .post(Api.ADD_PRODUCT_TO_CART, {
            userId: user._id,
            productId,
            quantity: 1,
          })
          .then((response) => {
            console.log(response);
            if (response.data && response.data.items) {
              // Modified condition
              toast.success("Item added to cart.");
              loadCart(); // Reload cart to update the cart list
            } else {
              toast.error("Failed to add product to cart.");
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to add product to cart.");
          });
      }
    } else {
      toast.error("Please sign in to add items to your cart.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-2">
        <h1 className="heading text-center mt-2 mb-2">Medicine</h1>
        <div className="row">
          {productList.map((product, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={product.imageUrl}
                  alt="product image"
                  className="img-fluid"
                />
                <div className="text-center card-title">
                  <p>{product.title.slice(0, 30)}</p>
                </div>
                <div className="text-center card-price">
                  {product.price} Rs.
                </div>
                <div className="text-center card-description">
                  {product.description
                    ? product.description.slice(0, 100)
                    : "No description available"}
                </div>
                <div className="btn-container">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigateToBuyNow(product._id)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => addProductToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
