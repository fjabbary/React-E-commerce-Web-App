import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async function () {
      const response = await axios.get("http://localhost:5000/customers");
      setCustomers(response.data);
    };

    fetchCustomers();
  });

  return (
    <div className="w-50 mx-auto mt-5">
      <h2>List of Customers</h2>
      <ListGroup>
        {customers.map(({ name, customer_id }) => (
          <ListGroup.Item
            key={customer_id}
            className="bg-light d-flex justify-content-between"
          >
            <div>{name}</div>
            <div>
              <i
                className="bi bi-pencil-square text-primary me-1"
                title="Delete Customer"
              ></i>
              <i
                className="bi bi-file-x-fill text-danger"
                title="Delete Customer"
              ></i>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Customer;
