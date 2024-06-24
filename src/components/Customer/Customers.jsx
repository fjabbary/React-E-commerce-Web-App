import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { Link } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async function () {
      const response = await axios.get("http://localhost:5000/customers");
      setCustomers(response.data);
    };

    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    await axios.delete(`http://localhost:5000/customers/${id}`);
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
    <div className="w-50 mx-auto mt-5">
      <h2>List of Customers</h2>
      <ListGroup>
        {customers.map((customer) => (
          <ListGroup.Item
            key={customer.customer_id}
            className="bg-light d-flex justify-content-between"
          >
            <div>{customer.name}</div>
            <div>
              <Link
                className="btn-sm me-3 btn btn-outline-dark"
                variant="outline-dark"
                to={`/customer/${customer.customer_id}`}
              >
                Customer Details
              </Link>
              <Link
                to={`/customer/edit/${customer.customer_id}`}
                state={customer}
              >
                <i
                  className="bi bi-pencil-square text-primary me-3"
                  title="Edit Customer"
                ></i>
              </Link>
              <i
                className="bi bi-file-x-fill text-danger"
                title="Delete Customer"
                onClick={() => deleteCustomer(customer.customer_id)}
              ></i>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Customers;
