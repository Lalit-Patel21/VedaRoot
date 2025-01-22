import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../apis/Api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function ViewMore() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, profile } = useSelector((state) => state.profile);

  useEffect(() => {
    getProductById();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadCart();
    }
  }, [isLoggedIn]);

  const loadCart = async () => {
    try {
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

  const navigateToBuyNow = (product) => {
    navigate(`/buy-now`, { state: { product } });
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
            userId: profile._id,
            productId,
            quantity: 1,
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success("Item added to cart.");
              loadCart();
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

  const getProductById = async () => {
    try {
      let response = await axios.get(Api.PRODUCT_BY_ID + `/${params.id}`);
      setProduct(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-between">
          <div
            className="col-md-6 d-flex flex-column"
            style={{ height: "400px", boxShadow: "10px 10px 10px grey" }}
          >
            <img
              src={product.imageUrl}
              style={{ width: "100%", height: "270px" }}
              alt="product"
            />
          </div>
          <div
            className="col-md-6"
            style={{ height: "400px", boxShadow: "10px 10px 10px grey" }}
          >
            <div className="p-3 d-flex flex-column">
              <h4>{product.title}</h4>
              <div>
                <p>
                  <b>brand :</b> {product.brand}
                </p>
              </div>
              <div>
                <p>
                  <b>description :</b> {product.description}
                </p>
              </div>
              <div>
                <b>price :</b>{" "}
                <label className="text-success">{product.price} Rs.</label>
              </div>
              <div>
                <b> rating :</b> {product.rating}
              </div>
              <button
                onClick={() => navigateToBuyNow(product)}
                className="btn btn-warning p-2"
              >
                Buy Now
              </button>
              <button
                onClick={() => addProductToCart(product._id)}
                className="btn btn-primary p-2"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
