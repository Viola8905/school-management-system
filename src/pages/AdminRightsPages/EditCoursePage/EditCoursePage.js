import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  editCourseRequest,
  getAllCoursesRequest,
} from "../../../apiCalls/coursesRequests";
import axios from "axios";

const EditCoursePage = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    lector: "",
    category: "",
    startDate: "",
    endDate: "",
		_id:""
  });
  const [lectors, setLectors] = useState([]);

  const courseId = useParams().id;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCoursesRequest();
        setCourse(response.find((item) => item._id === courseId));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editCourse = editCourseRequest(course);
    await editCourse(course);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={course.description}
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
          <Form.Control
            type="text"
            name="category"
            value={course.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="startDate"
            value={course.startDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="endDate"
            value={course.endDate}
            onChange={handleChange}
          />
        </Form.Group>
        <div style={{ padding: "20px 0" }}>
          <Button type="submit">Редагувати курс</Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditCoursePage;
