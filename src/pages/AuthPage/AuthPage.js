import React, { useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, registration } from "../../apiCalls/userRequests";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = () => {
    const responce = dispatch(login(email, password));
    if (responce) {
      navigate("/");
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center "
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: 600 }} className="p-5">
          <h2 className="m-auto">{isLogin ? "Авторизація " : " Реєстрація"}</h2>
          <Form className="d-flex flex-column">
            {isLogin ? (
              <div className="">
                <Form.Control
                  className="mt-2"
                  placeholder="Пошта"
                  value={email}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Control
                  className="mt-2"
                  placeholder="Пароль "
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div>
                <Form.Control
                  className="mt-2"
                  placeholder="Ім'я"
                  value={first_name}
                  onChange={(e) => {
                    setFirst_name(e.target.value);
                  }}
                />
                <Form.Control
                  className="mt-2"
                  placeholder="По-батькові"
                  value={middle_name}
                  onChange={(e) => {
                    setMiddle_name(e.target.value);
                  }}
                />
                <Form.Control
                  className="mt-2"
                  placeholder="Пошта"
                  value={email}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Control
                  className="mt-2"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            )}
          </Form>

          <Row className=" d-flex justify-content-between  mt-3 pl-3 pr-3 ">
            {isLogin ? (
              <>
                <div className="">
                  Ще не зареєстровані?
                  <NavLink to="/registration">
                    Перейти до створення акаунту!
                  </NavLink>
                </div>
              </>
            ) : (
              <div>
                Вже є акаунт?
                <NavLink to="/login"> Перейти до авторизації!</NavLink>
              </div>
            )}

            {isLogin ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="primary"
                  onClick={loginHandler}
                  style={{ marginTop: "20px" }}
                >
                  Увійти
                </Button>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
                onClick={() =>
                  registration(first_name, middle_name, email, password)
                }
              >
                <Button variant={"primary"}>
                  <NavLink
                    to="/login"
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    Зареєструватися
                  </NavLink>
                </Button>
              </div>
            )}
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default AuthPage;
