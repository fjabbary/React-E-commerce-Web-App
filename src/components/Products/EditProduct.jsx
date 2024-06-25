import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import axios from "axios";

function EditProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const location = useLocation();
  const { name, image, description, price } = location.state || {};
  const productToUpdate = { name, image, description, price };
  const { id } = useParams();

  useEffect(() => {
    setNewProduct(productToUpdate);
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:5000/products/${id}`,
      newProduct
    );
    e.target.reset();
    navigate("/products");
  };

  return (
    <Container className="mt-5 w-50">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={newProduct.name}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={handleChange}
                value={newProduct.price}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            onChange={handleChange}
            value={newProduct.image}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            onChange={handleChange}
            value={newProduct.description}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
