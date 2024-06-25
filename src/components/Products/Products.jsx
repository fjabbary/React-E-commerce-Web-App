import { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import Cart from "../Cart";

function Products() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  const customer = location.state;

  useEffect(() => {
    const fetchProducts = async function () {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.product_id === product.product_id
    );

    console.log(existingItem);

    if (!existingItem) {
      console.log("object");
      const newItem = { ...product, qty: 1 };
      setCartItems([...cartItems, newItem]);
    } else {
      const updatedProducts = cartItems.map((item) => {
        console.log("xxx");
        if (item.product_id === product.product_id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });

      setCartItems(updatedProducts);
    }
  };

  return (
    <Container className="mt-5 products">
      <Row>
        {customer ? (
          <>
            <h3>Items to shop for "{customer.name}"</h3>
            <p>Please select green cart icon to add item to the cart</p>
          </>
        ) : (
          <h3>
            Please select customer from{" "}
            <Link to="/customers"> customers page </Link>
          </h3>
        )}
        {products.map((product) => (
          <Col key={product.product_id}>
            <Card style={{ width: "18rem" }} className="mt-5 pb-3">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body className="d-flex justify-content-between">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <b>Price:</b> ${product.price}
                </Card.Text>
              </Card.Body>
              <Container>
                <Row>
                  <Col>
                    <Button
                      variant="primary"
                      className="w-100"
                      as={Link}
                      to={`/product/${product.product_id}`}
                    >
                      Details
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-warning"
                      className="w-100"
                      as={Link}
                      to={`/product/edit/${product.product_id}`}
                      state={product}
                    >
                      Edit
                    </Button>
                    {customer && (
                      <Button
                        variant="success"
                        className="btn-sm"
                        id="add-to-card"
                        title="Add to Cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="bi bi-cart4"></i>
                      </Button>
                    )}
                  </Col>
                </Row>
              </Container>
            </Card>
          </Col>
        ))}
      </Row>
      {cartItems.length > 0 && (
        <Cart cartItems={cartItems} customer={customer} />
      )}
    </Container>
  );
}

export default Products;
