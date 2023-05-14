import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import courseBg from "../../../assets/course-card-bg.png";

const EditCoursePage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

	const id = useParams().id;
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
  const course = courses.find((item) => item.id === id);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
      setPreviewImage(URL.createObjectURL(img));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const course = {
      id,
      title,
      category,
      description,
      image,
    };
    console.log(course);
    
  };

  useEffect(() => {
		 const course = courses.find((item) => item.id === id);
    // Fetch the course details from the API when the component mounts.
    // This is not implemented in this example.
    setTitle(course.title);
    setCategory(course.category);
    setDescription(course.description);
    setImage(course.image);
    setPreviewImage(course.image);
  }, [id]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default EditCoursePage;
