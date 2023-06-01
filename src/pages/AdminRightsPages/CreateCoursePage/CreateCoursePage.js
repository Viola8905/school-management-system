import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { createCourseRequest } from "../../../apiCalls/coursesRequests";
import axios from "axios";

const CreateCoursePage = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    lector: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const [lectors, setLectors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/getAllTeachers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setLectors(res.data))
      .catch((err) => alert(err));
  }, []);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createCourse = createCourseRequest(course);
    await createCourse(course);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ padding: "20px 0" }}>Форма створення курсу</h1>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Lector</Form.Label>
          <Form.Control
            as="select"
            name="lector"
            value={course.lector}
            onChange={handleChange}
          >
            <option value="">Please select...</option>
            {lectors.map((lector) => (
              <option key={lector._id} value={lector._id}>
                {lector.name} {lector.surname}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="startDate"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="endDate"
            onChange={handleChange}
          />
        </Form.Group>
        <div style={{ padding: "20px 0" }}>
          <Button type="submit">Створити курс</Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateCoursePage;
