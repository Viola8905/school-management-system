import React, { useEffect } from "react";
import { coursesApplicationsRequest } from "../../../apiCalls/coursesRequests";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";

const CoursesApplicationsPage = () => {
  const [activeKey, setActiveKey] = React.useState("0");
  const [applications, setApplications] = React.useState([]);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await coursesApplicationsRequest();
        setApplications(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();

  }, []);

  const statuses = [
    { value: "0", label: "На розгляді" },
    { value: "1", label: "Прийняті" },
    { value: "2", label: "Відхилені" },
  ];

  const renderCourseList = () => {
    return applications
      .filter((application) => application.status.toString() === activeKey)
      .map((item, index) => (
        <Col key={index} sm={6} md={4} lg={3}>
          <Card className="mb-4 mt-4 shadow-sm">{item._id}</Card>
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
