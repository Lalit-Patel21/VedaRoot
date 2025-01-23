import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../apis/Api"; // Ensure you have this import
import { useSelector } from "react-redux";

export default function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchOrders = async () => {
      if (profile._id) {
        // Ensure the user ID is available
        try {
          let response = await axios.get(
            Api.GET_ORDER_BY_USER_ID + `/${profile._id}`
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };

    fetchOrders();
  }, [profile._id]);

  return (
    <>
      <div className="container mt-5">
        <h1 className="bg-success text-white text-center">My Orders</h1>
        {orders.map((order) => (
          <div key={order._id} className="row mt-3">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <strong>Order ID:</strong> {order._id} |{" "}
                  <strong>Status:</strong> {order.status}
                </div>
                <div className="card-body">
                  <h5 className="card-title">Shipping Details</h5>
                  <p className="card-text">
                    <strong>Full Name:</strong> {order.fullName}
                    <br />
                    <strong>Address:</strong> {order.shippingAddress},{" "}
                    {order.city}, {order.state}, {order.pinCode}
                    <br />
                    <strong>Contact:</strong> {order.userContact}
                    <br />
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleString()}
                    <br />
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Items</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        {/* <th>Description</th> */}
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              src={item.productId.imageUrl}
                              alt={item.productId.title}
                              width="50"
                            />
                          </td>
                          <td>{item.productId.title}</td>
                          {/* <td>{item.productId.description}</td> */}
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
