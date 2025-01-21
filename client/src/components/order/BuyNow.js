// import Header from "../header/Header";

// export default function BuyNow() {
//   return (
//     <>
//       <Header />
//       <div className="container - mt-5">
//         <h1>Buy now component...</h1>
//       </div>
//     </>
//   );
// }

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function BuyNow() {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (location.state) {
      if (location.state.product) {
        setProduct(location.state.product);
      } else if (location.state.cartItems) {
        setCartItems(location.state.cartItems);
      }
    }
  }, [location.state]);

  const handlePurchase = () => {
    // Handle purchase logic for single product or cart items
  };

  return (
    <div className="container mt-4">
      <h1 className="heading text-center mt-2 mb-4">Purchase</h1>
      {product ? (
        <div>
          <h2>{product.title}</h2>
          <p>Price: {product.price} Rs.</p>
          {/* Display other product details */}
          <button className="btn btn-primary" onClick={handlePurchase}>
            Complete Purchase
          </button>
        </div>
      ) : (
        <div>
          <h2>Cart Items</h2>
          {cartItems.map((item, index) => (
            <div key={index}>
              <h3>{item.productId.title}</h3>
              <p>Price: {item.productId.price} Rs.</p>
              <p>Quantity: {item.quantity}</p>
              {/* Display other item details */}
            </div>
          ))}
          <button className="btn btn-primary" onClick={handlePurchase}>
            Complete Purchase
          </button>
        </div>
      )}
    </div>
  );
}

export default BuyNow;
