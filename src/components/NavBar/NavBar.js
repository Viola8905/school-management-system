import React from "react";
import { ContentData } from "./NavBar.data";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

const NavBar = () => {
  const { menuLinks, logo } = ContentData;

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <div style={{ width: "50px", heigh: "50px" }}>
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {menuLinks.map((link) => {
              return (
                <div key={link.id} style={{ margin: "5px 20px" }}>
                  <Link to={`/${link.scrollId}`} style={{ color: "black" }}>
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </Nav>

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
