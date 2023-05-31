import React, { useEffect } from "react";
import {
  approveCourseApplicationRequest,
  coursesApplicationsRequest,
  getAllCoursesRequest,
  rejectCourseApplicationRequest,
} from "../../../apiCalls/coursesRequests";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { getAllUsersRequest } from "../../../apiCalls/userRequests";

const CoursesApplicationsPage = () => {
  const [activeKey, setActiveKey] = React.useState("0");
  const [applications, setApplications] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const fetchAllApplications = async () => {
    try {
      const response = await coursesApplicationsRequest();
      setApplications(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAppliationReject = async (applicationId) => {
    const response = await rejectCourseApplicationRequest(applicationId);

    await fetchAllApplications();
  };

  const handleAppliationApprove = async (applicationId) => {
    const response = await approveCourseApplicationRequest(applicationId);

    await fetchAllApplications();
  };

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await getAllCoursesRequest();

        setCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchAllUsers = async () => {
      const data = await getAllUsersRequest();
      setUsers(data);
    };

    fetchAllApplications();

    fetchAllCourses();

    fetchAllUsers();
  }, []);

  useEffect(() => {}, [applications]);

  const statuses = [
    { value: "0", label: "На розгляді" },
    { value: "1", label: "Прийняті" },
    { value: "2", label: "Відхилені" },
  ];

  const renderCourseList = () => {
    return applications
      .filter((application) => application.status.toString() === activeKey)
      .map((application, index) => (
        <Col key={index} sm={6} md={4} lg={3}>
          {courses
            .filter((course) => course._id === application.courseId)
            .map((course) => (
              <Card className="mb-4 mt-4 shadow-sm">
                <Card.Body>
                  <Card.Text>Назва курсу:</Card.Text>
                  <Card.Title
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {course.title}
                  </Card.Title>

                  {users
                    .filter((user) => user._id === application.applicantId)
                    .map((user) => (
                      <>
                        <Card.Text>Аплікант:</Card.Text>
                        <Card.Title>
                          {user.name}
                          {user.surname}
                        </Card.Title>
                      </>
                    ))}
                  {application.status === 0 && (
                    <>
                      <div
                        style={{ margin: " 0 0 10px 0" }}
                        onClick={() => handleAppliationApprove(application._id)}
                      >
                        <Button variant="success">Прийняти</Button>
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleAppliationReject(application._id);
                        }}
                      >
                        Відхилити
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            ))}
        </Col>
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
                active={activeKey === status.value}
              >
                {status.label.charAt(0).toUpperCase() + status.label.slice(1)}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      <Row className="mt-4">{renderCourseList()}</Row>
    </Container>
  );
};

export default CoursesApplicationsPage;
