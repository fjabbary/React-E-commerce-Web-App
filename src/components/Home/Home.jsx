import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="home text-center"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/premium-photo/ecommerce-data-software-provide-modish-dashboard-sale-analysis_31965-181540.jpg?w=1480)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <h2 style={{ paddingTop: "100px" }}>Welcome to E-commerce website!</h2>

      <Button
        as={Link}
        to="/customers"
        variant="warning"
        className="btn btn-lg"
      >
        Shop Now
      </Button>
    </div>
  );
}

export default Home;
