import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProduct = async function () {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProductDetails(response.data);
    };

    fetchProduct();
  }, []);

  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    navigate("/products");
  };

  return (
    <Container className="mt-5 mx-auto">
      <Card style={{ width: "80%", margin: "auto" }}>
        <Row>
          <Col md={12} lg={6}>
            <Card.Img variant="top" src={productDetails.image} />
          </Col>
          <Col md={12} lg={6}>
            <Card.Body>
              <Card.Title>{productDetails.name}</Card.Title>
              <Card.Text>{productDetails.description}</Card.Text>
              <Card.Text>
                <b>Price: </b> ${productDetails.price}
              </Card.Text>
              <div className="mt-5 d-flex justify-content-between">
                {/* <Button variant="success">Add to Cart</Button> */}
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemove(id)}
                >
                  Remove Product
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Button variant="outline-dark" className="mt-5" as={Link} to="/products">
        Back to Products
      </Button>
    </Container>
  );
}

export default ProductDetails;
