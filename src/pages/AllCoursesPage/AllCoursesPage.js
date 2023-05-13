import React from "react";

import courseBg from "../../assets/course-card-bg.png";
import { Nav, Container, Row, Col, Card } from "react-bootstrap";
import {
  Course,
  CourseImage,
  CourseTitle,
  CourseType,
  CoursesList,
} from "./AllCoursesPage.styles";
import { Link } from "react-router-dom";

const AllCoursesPage = () => {
  const [activeKey, setActiveKey] = React.useState("/all-courses");

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    // Perform filtering logic based on the selected key
    // For example, you can update the state or trigger an API call
    // to fetch filtered data based on the selected category
  };
  const renderCourseList = () => {
    // You can replace this static data with dynamic data from an API or a state
    const courses = [
      {
        id: "1",
        title: "Course 1",
        category: "All Courses",
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
          <Course>
            <div>
              <Link to={`/courses/${item.id}`}>Check</Link>
            </div>
            <CourseTitle>{item.title}</CourseTitle>
            <CourseType>{item.description}</CourseType>
          </Course>
        </Col>
      ));
  };
  return (
    <Container>
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
        <Nav.Item>
          <Nav.Link eventKey="Programming" active={activeKey === "Programming"}>
            Programming
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Marketing" active={activeKey === "Marketing"}>
            Marketing
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Row className="mt-4">{renderCourseList()}</Row>
    </Container>
  );
};

export default AllCoursesPage;
