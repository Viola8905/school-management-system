import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import {
  getAllCoursesRequest,
  getUserCoursesApplicationsRequest,
} from "../../apiCalls/coursesRequests";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import courseBg from "../../assets/course-card-bg.png";

const MyCoursesPage = () => {
  const [activeStatus, setActiveStatus] = useState("0");
  const [applications, setApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const userId = useSelector((state) => state.user.currentUser.id);
	const statuses = [
		{ value: "0", label: "На розгляді" },
		{ value: "1", label: "Прийнято" },
		{ value: "2", label: "Відхилено" },
	];

  useEffect(() => {
    if (userId) {
      const fetchApplications = async () => {
        const data = await getUserCoursesApplicationsRequest(userId);
        setApplications(data);
      };
      fetchApplications();

      const fetchCourses = async () => {
        try {
          const response = await getAllCoursesRequest();
          setCourses(response);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    }
  }, [userId]);


  const handleSelect = (selectedStatus) => {
    setActiveStatus(selectedStatus);
  };

  const renderApplicationsList = () => {
    return applications
      .filter((application) => application.status.toString() === activeStatus)
      .map((application, index) => (
        <>
          {courses
            .filter((course) => course._id === application.courseId)
            .map((course) => (
              <Col key={index} sm={6} md={4} lg={3}>
                <Card className="mb-4 mt-4 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={courseBg}
                    style={{ backgroundImage: "linear-gradient(lightgreen, grey)" }}
                  />
                  <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.category}</Card.Text>
                    <Link to={`/courses/${course._id}`}>
                      <Button variant="success">Переглянути</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </>
      ));
  };
  return (
    <Container style={{ padding: "20px" }}>
      <Nav variant="pills" defaultActiveKey="0" onSelect={handleSelect}>
        {statuses.map((status) => {
          return (
            <Nav.Item>
              <Nav.Link
                eventKey={status.value}
                active={activeStatus === status.value}
              >
                {status.label.charAt(0).toUpperCase() + status.label.slice(1)}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      <Row className="mt-4">{renderApplicationsList()}</Row>
    </Container>
  );
};

export default MyCoursesPage;
