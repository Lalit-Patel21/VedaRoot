import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import "./Product.css"; // Assuming you saved the CSS as Product.css
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Product() {
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, profile } = useSelector((state) => state.profile);

  useEffect(() => {
    loadProducts();
    if (isLoggedIn && profile && profile._id) {
      loadCart();
    }
  }, [isLoggedIn, profile]);

  const loadProducts = async () => {
    try {
      let response = await axios.get(Api.LOAD_PRODUCT);
      console.log(response);
      setProductList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCart = async () => {
    if (!profile || !profile._id) {
      console.error("Profile or User ID is undefined");
      return;
    }
    try {
      console.log("Loading cart for user ID:", profile._id); // Debugging line
      let response = await axios.get(
        Api.GET_PRODUCT_FROM_CART + `/${profile._id}`
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

  const navigateToViewMore = (id) => {
    navigate(`view-more/${id}`);
  };

  const addProductToCart = (productId) => {
    if (isLoggedIn && profile && profile._id) {
      const isProductInCart = cartList.some(
        (item) => item.productId._id === productId
      );

      if (isProductInCart) {
        toast.error("Item already added to cart.");
      } else {
        axios
          .post(Api.ADD_PRODUCT_TO_CART, {
            userId: profile._id,
            productId,
            quantity: 1,
          })
          .then((response) => {
            if (response.status === 200) {
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
      <div className="container mt-2">
        <h1 className="heading text-center mt-2 mb-2">Medicine</h1>
        <div className="card-container">
          {productList.map((product, index) => (
            <div key={index} className="card">
              <img
                src={product.imageUrl}
                alt="product image"
                className="img-fluid"
              />
              <div className="text-center card-title">
                <p>{product.title.slice(0, 30)}</p>
              </div>
              <div className="text-center card-price">{product.price} Rs.</div>
              <div className="btn-container">
                <button
                  className="btn btn-primary"
                  onClick={() => navigateToViewMore(product._id)}
                >
                  View More
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => addProductToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
