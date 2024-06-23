import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useNavigate } from "react-router-dom";

function AddCustomer() {
  const navigate = useNavigate();
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [feedback, setFeedback] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    const form = event.target;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/customers",
          newCustomer,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setFeedback(response.data.Message);
        setTimeout(() => {
          navigate("/customers");
        }, 2000);
      } catch (err) {
        console.log(err.data.Message);
      }
    }
  };

  return (
    <div className="w-50 mx-auto mt-5 border p-5 bg-light">
      <h2>Add / Edit Customer</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            pattern="^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$"
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Full name must include first and last name and they have to be at
            least 3 characters each (E.g. Jonh Doe)
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            pattern="[\w.]+@[\w]+[.][a-z]{2,}"
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            onChange={handleChange}
            pattern="[\d]{10}"
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Phone number has to be 10 digits
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="outline-success" type="submit">
          <b>Add Customer</b>
        </Button>
      </Form>

      {feedback && (
        <Alert key="info" variant="info" className="mt-3">
          {feedback}
        </Alert>
      )}
    </div>
  );
}

export default AddCustomer;
