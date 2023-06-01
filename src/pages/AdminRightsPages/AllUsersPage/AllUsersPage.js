import React, { useEffect, useState } from "react";
import { Nav, Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import {
  deleteUserRequest,
  getAllUsersRequest,
} from "../../../apiCalls/userRequests";

const AllUsersPage = () => {
  const [activeRole, setActiveRole] = useState("user");
  const [users, setUsers] = useState([]);

  const handleSelect = (selectedRole) => {
    setActiveRole(selectedRole);
  };

  const handleDelete = async (userId) => {
    await deleteUserRequest(userId);
    setUsers(users.filter((user) => user._id !== userId)); // update the state
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsersRequest();
      setUsers(data);
    };

    fetchData();
  }, []);

  const roles = ["user", "admin", "teacher"];

  const renderUserList = () => {
    const allUsers = users.filter((user) => user.role === activeRole);
    if (allUsers.length > 0) {
      return allUsers.map((user, index) => (
        <Col key={index} sm={6} md={4} lg={3}>
          <Card className="mb-4 mt-4 shadow-sm">
            <Card.Body>
              <Card.Title>
                {user.name} {user.surname}
              </Card.Title>
              <Card.Text>роль: {user.role}</Card.Text>
              <Button
                variant="danger"
                onClick={() => handleDelete(user._id)}
                style={{ marginLeft: "10px" }}
              >
                Видалити користувача
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ));
    } else {
      return (
        <Container className="d-flex h-100">
          <Row className="justify-content-center align-self-center w-100">
            <Col xs={12} md={6}>
              <Alert variant="info" className="text-center">
                Немає записів
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  return (
    <Container style={{ padding: "20px" }}>
      <Row>
        <Col>
          <h1 style={{ padding: "20px 0" }}>Усі користувачі</h1>
        </Col>
      </Row>
      <Nav variant="pills" defaultActiveKey="user" onSelect={handleSelect}>
        {roles.map((role) => {
          return (
            <Nav.Item>
              <Nav.Link eventKey={role} active={activeRole === role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      <Row className="mt-4">{renderUserList()}</Row>
    </Container>
  );
};

export default AllUsersPage;
