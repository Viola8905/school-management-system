import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";


const CreateCoursePage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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
      title,
      category,
      description,
      image,
    };
    console.log(course);
    // Here you would usually make an API request to save your new course.
    // Redirect to home page after form submission.
  };

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
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateCoursePage;
