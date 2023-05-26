import React from "react";
import { ContentData } from "./NavBar.data";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { logout } from "../../reducers/userReducer";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const role = useSelector((state) => state.user.currentUser.role);
  const dispatch = useDispatch();
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
            {role === "admin" && (
              <>
                <div style={{ margin: "5px 20px" }}>
                  <Link to={`/create-course`} style={{ color: "black" }}>
                    Створити курс
                  </Link>
                </div>
                <div style={{ margin: "5px 20px" }}>
                  <Link to={`/courses-applications`} style={{ color: "black" }}>
                    Заявки на курси
                  </Link>
                </div>
                <div style={{ margin: "5px 20px" }}>
                  <Link to={`/users`} style={{ color: "black" }}>
                    Користувачі
                  </Link>
                </div>
                <div style={{ margin: "5px 20px" }}>
                  <Button variant="warning"> Адмін</Button>
                </div>
              </>
            )}
            {role === "user" && (
              <>
                <div style={{ margin: "5px 20px" }}>
                  <Link to={`/my-courses`} style={{ color: "black" }}>
                    Мої заявки на курси
                  </Link>
                </div>
                <div style={{ margin: "5px 20px" }}>
                  <Button variant="info">Студент</Button>
                </div>
              </>
            )}
            {role === "teacher" && (
              <>
                <div style={{ margin: "0px 20px" }}>
                  <Button variant="info">Викладач</Button>
                </div>
              </>
            )}
            {isAuth ? (
              <>
                <div
                  style={{ margin: "5px 20px" }}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <Link to={`/`} style={{ color: "black" }}>
                    Log out
                  </Link>
                </div>
              </>
            ) : (
              <div style={{ margin: "5px 20px" }}>
                <Link to={`/login`} style={{ color: "black" }}>
                  Login
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
