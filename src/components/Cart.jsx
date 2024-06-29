import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import axios from "axios";

const Cart = ({ cartItems, customer, cartOriginalItems, setShow }) => {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  const todayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      customer_id: customer.customer_id,
      date: todayDate(),
      products: cartOriginalItems,
    };

    setShow(true);
    try {
      await axios.post("http://127.0.0.1:5000/orders", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShow(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card className="mt-5 w-50 mx-auto mb-5">
        <Card.Body style={{ backgroundColor: "#f2f0b3" }}>
          <Card.Title>Items in Cart</Card.Title>
          <Card.Text>Order summary for {customer?.name}</Card.Text>

          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.product_id}
                className="mb-2 d-flex justify-content-between"
              >
                <div>
                  <div>
                    <b>Product name:</b> {item.name}
                  </div>
                  <div>
                    <b>Price:</b> ${item.price}
                  </div>
                </div>
                <div>
                  <b>Quantity: </b>
                  {item.qty}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Button
            variant="success"
            className="mt-2 float-end"
            onClick={handleSubmit}
          >
            Place Order
          </Button>
          <p className="mt-3 me-5 float-end">
            <b>Total</b>: ${totalPrice}
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cart;
