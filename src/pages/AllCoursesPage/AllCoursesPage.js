import React from "react";

import courseBg from "../../assets/course-card-bg.png";
import { Nav, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AllCoursesPage = () => {
  const [activeKey, setActiveKey] = React.useState("/all-courses");
  const role = useSelector((state) => state.user.currentUser.role);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const courses = [
    {
      id: "1",
      title: "Course 1",
      category: "Design",
      description: "This is the first course.",
      image: courseBg,
    },
    {
      id: "2",
      title: "Course 2",
      category: "Programming",
      description: "This is a programming course.",
      image: courseBg,
    },
    {
      id: "3",
      title: "Course 3",
      category: "Marketing",
      description: "This is a marketing course.",
      image: courseBg,
    },
  ];
  const categories = [...new Set(courses.map((course) => course.category))];
  const renderCourseList = () => {
    return courses
      .filter((course) => {
        if (activeKey === "/all-courses") {
          return true;
        } else {
          return course.category === activeKey;
        }
      })
      .map((item, index) => (
        <Col key={index} sm={6} md={4} lg={3}>
          <Card className="mb-4 shadow-sm">
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.category}</Card.Text>
              <Link to={`/courses/${item.id}`}>
                <Button variant="success">Переглянути</Button>
              </Link>
              {role === "admin" && (
                <Link to={`/edit-course/${item.id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      ));
  };
  return (
    <Container style={{ padding: "20px" }}>
      <Nav
        variant="pills"
        defaultActiveKey="/all-courses"
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="/all-courses"
            active={activeKey === "/all-courses"}
          >
            All Courses
          </Nav.Link>
        </Nav.Item>
        {categories.map((item) => {
          return (
            <Nav.Item>
              <Nav.Link eventKey={item} active={activeKey === item}>
                {item}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      <Row className="mt-4">{renderCourseList()}</Row>
    </Container>
  );
};

export default AllCoursesPage;
