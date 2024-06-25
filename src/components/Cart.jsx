import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Cart = ({ cartItems, customer }) => {
  return (
    <>
      <Card className="mt-5 w-50 mx-auto mb-5">
        <Card.Body style={{ backgroundColor: "#f2f0b3" }}>
          <Card.Title>Items in Cart</Card.Title>
          <Card.Text>Order summary for {customer.name}</Card.Text>

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

          <Button variant="success" className="mt-5 float-end">
            Place Order
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cart;
