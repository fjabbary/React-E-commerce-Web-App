import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import Cart from "../Cart";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOriginalItems, setCartOriginalItems] = useState([]);
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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

    if (!existingItem) {
      const newItem = { ...product, qty: 1 };
      setCartItems([...cartItems, newItem]);
      setCartOriginalItems([...cartOriginalItems, product]);
    } else {
      const updatedProducts = cartItems.map((item) => {
        if (item.product_id === product.product_id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });

      setCartItems(updatedProducts);
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate("/");
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
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.product_id}>
              <Card style={{ width: "18rem" }} className="mt-5 pb-3">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                />
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
          ))
        ) : (
          <h2 className="text-center mt-5">
            No product exists. Please add product.
          </h2>
        )}
      </Row>
      {cartItems.length > 0 && customer?.customer_id && (
        <Cart
          cartItems={cartItems}
          cartOriginalItems={cartOriginalItems}
          customer={customer}
          setShow={setShow}
        />
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Order placed successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Products;
