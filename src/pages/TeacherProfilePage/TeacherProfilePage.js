import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  editTeacherProfileRequest,
  getUserByEmailRequest,
} from "../../apiCalls/userRequests";

const TeacherProfilePage = () => {
  const teacherEmail = useSelector((state) => state.user.currentUser.email);
  const [editTeacher, setEditTeacher] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const handleInputChange = (event) => {
    setEditTeacher({ ...editTeacher, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await getUserByEmailRequest(teacherEmail);
        setEditTeacher(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchTeacherData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const editTeacherRequest = editTeacherProfileRequest(editTeacher);
    await editTeacherRequest(editTeacher);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    // Generate a URL for the selected file for previewing
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = () => {
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append("avatar", selectedFile);

      const requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        redirect: "follow",
      };

      fetch("http://localhost:3001/api/users/uploadAvatar", requestOptions)
        .then((response) => response.text())
        .catch((error) => console.log("error", error));
    } else {
      console.log("No file selected");
    }
  };
  var source = `../../../../backend${editTeacher.avatar}`;

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ padding: "20px 0" }}>Редагування данних викладача</h1>
        </Col>
      </Row>
      <Col xs={12} md={4}>
        <Form>
          <Form.Group>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            {/* {previewUrl && ( */}
            {/* <img
              src={source}
             
              style={{ maxWidth: "100%", height: "auto" }}
            /> */}
            {/* )} */}
          </Form.Group>
          <Button variant="primary" onClick={uploadImage}>
            Upload
          </Button>
        </Form>

        {/*
        <Form>
          <Form.Group>
            <Form.Control
              type="file"
              id="avatarFile"
              label="Change Avatar"
              onChange={handleAvatarChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form> */}
      </Col>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={editTeacher.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={editTeacher.surname}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={editTeacher.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={editTeacher.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div style={{ padding: "20px 0" }}>
          <Button variant="primary" type="submit">
            Редагувати Профіль
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default TeacherProfilePage;
