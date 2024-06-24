import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CustomerDetails() {
  const { id } = useParams();
  const [customerDetails, setCustomerDetails] = useState({});

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const response = await axios.get(`http://localhost:5000/customers/${id}`);
      setCustomerDetails(response.data);
    };
    fetchCustomerDetails();
  }, []);

  const { name, email, phone, customer_account, orders } = customerDetails;

  return (
    <div className="mx-auto w-50 customer-details">
      <h2>Customer Details</h2>
      <ul className="list-group">
        <li className="list-group-item bg-light">
          <b>Username: </b> {customer_account && customer_account.username}
        </li>
        <li className="list-group-item bg-light">
          <b>Name: </b> {name}
        </li>
        <li className="list-group-item bg-light">
          <b>Email: </b> {email}
        </li>
        <li className="list-group-item bg-light">
          <b>Phone: </b> {phone}
        </li>
        <li className="list-group-item bg-light">
          <b>
            <h4>Assoicated Orders: </h4>
          </b>
          <ul className="list-group">
            {orders &&
              orders.map((order, index) => (
                <li className="list-group-item order-info" key={order.order_id}>
                  <h5 className="text-danger">Order #{index + 1}</h5>
                  <p>
                    <b>Order Date:</b> {order.date}
                  </p>
                  <p>
                    <b>Order Status:</b> {order.status}
                  </p>

                  <ul className="list-group">
                    {order.products.map((product) => (
                      <li className="list-group-item" key={product.product_id}>
                        <b>Product Name: </b>
                        {product.name} - <b>Price:</b> ${product.price}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </li>
      </ul>

      <Link to="/customers" className="btn btn-sm btn-primary mt-3">
        Back to Customers
      </Link>
    </div>
  );
}

export default CustomerDetails;
