import React, { useEffect } from "react";

import courseBg from "../../assets/course-card-bg.png";
import { Nav, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCoursesRequest } from "../../apiCalls/coursesRequests";

const AllCoursesPage = () => {
  const [activeKey, setActiveKey] = React.useState("/all-courses");
  const [courses, setCourses] = React.useState([]);
  const role = useSelector((state) => state.user.currentUser.role);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCoursesRequest();
        setCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

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
          <Card className="mb-4 mt-4 shadow-sm">
            <Card.Img
              variant="top"
              src={courseBg}
              style={{ backgroundImage: "linear-gradient(lightgreen, grey)" }}
            />
            <Card.Body>
              <Card.Title
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </Card.Title>
              <Card.Text>{item.category}</Card.Text>
              <Link to={`/courses/${item._id}`}>
                <Button variant="success">Переглянути</Button>
              </Link>
              {role === "admin" && (
                <div style={{ margin: "10px 0" }}>
                  <Link to={`/edit-course/${item._id}`}>
                    <Button variant="primary">Редагувати</Button>
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      ));
  };
  return (
    <Container style={{ padding: "20px" }}>
      <Row>
        <Col >
          <h1 style={{padding:"20px 0"}}>Огляд курсів</h1>
        </Col>
      </Row>
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
