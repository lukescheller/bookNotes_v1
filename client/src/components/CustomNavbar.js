import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import User from "../img/defaultUser.jpg";

const CustomNavbar = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg" variant="light">
        <Navbar.Brand>
          <Link to="/home">
            <img src={User} alt="" width="60px" style={{ margin: "5px" }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          style={{ textAlign: "center" }}
        >
          <Link
            to="/home"
            style={{
              color: "black",
              margin: "10px",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <br />
          <Link
            to="/profile"
            style={{ color: "black", margin: "10px", textDecoration: "none" }}
          >
            Profile
          </Link>
          <br />
          <Link
            to="/publish"
            style={{ color: "black", margin: "10px", textDecoration: "none" }}
          >
            Publish
          </Link>
          <br />
          <Link
            to="/users"
            style={{ color: "black", margin: "10px", textDecoration: "none" }}
          >
            Users
          </Link>
          <br />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
