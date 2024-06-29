import "./navigation.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/" className="mx-lg-4"> Home </Nav.Link> */}
            <NavDropdown title="Manage Customer" className="mx-2">
              <NavDropdown.Item to="/customers" as={Link}>
                View Customers
              </NavDropdown.Item>
              <NavDropdown.Item to="/customer/add" as={Link}>
                Add Customer
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Manage Products" className="mx-2">
              <NavDropdown.Item to="/products" as={Link}>
                View Products
              </NavDropdown.Item>
              <NavDropdown.Item to="/product/add" as={Link}>
                Add Product
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Manage Orders" className="mx-2">
              <NavDropdown.Item to="/orders" as={Link}>
                View Orders
              </NavDropdown.Item>
              {/* <NavDropdown.Item to="#" as={Link}>
                #
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
