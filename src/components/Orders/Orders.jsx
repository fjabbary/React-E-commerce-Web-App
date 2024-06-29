import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("http://127.0.0.1:5000/orders");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="w-50 mx-auto mt-5 text-center">
      <h1>Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Id</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_id}</td>
                <td>{order.date}</td>
                {/* {
                  (color =
                    order.status == "pending"
                      ? (color = "order-pending")
                      : (color = "order-cancelled"))
                } */}
                <td>
                  <span
                    className={
                      order.status === "pending"
                        ? "order-pending p-1"
                        : "order-cancelled p-1"
                    }
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <ul className="list-group">
                    {order.products.map((product) => (
                      <div key={product.product_id}>
                        <li className="list-group-item order-info">
                          <div>
                            {" "}
                            <b>Product Name: </b>
                            {product.name}{" "}
                          </div>
                          <div>
                            <b>Price:</b> ${product.price}
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
