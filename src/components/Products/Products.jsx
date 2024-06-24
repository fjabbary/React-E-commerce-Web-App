import { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async function () {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-5 products">
      <Row>
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
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
