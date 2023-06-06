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
  const [previewUrl, setPreviewUrl] = React.useState("");

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await getUserByEmailRequest(teacherEmail);
        setEditTeacher(response);
        setPreviewUrl(`http://localhost:3001/${response.avatar}`);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchTeacherData();
  }, []);

  const handleInputChange = (event) => {
    setEditTeacher({ ...editTeacher, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const editTeacherRequest = editTeacherProfileRequest(editTeacher);
    await editTeacherRequest(editTeacher);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
        .then(() => alert("аватар викладача успішно оновлено"))
        .catch((error) => console.log("error", error));
    } else {
      alert("No file selected");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ padding: "20px 0" }}>Редагування данних викладача</h1>
        </Col>
      </Row>
      <Col xs={12} md={4}>
        <Form>
          <Form.Label>Аватар викладача</Form.Label>
          {previewUrl && (
            <Image
              src={previewUrl}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <Form.Group>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button
            variant="primary"
            onClick={uploadImage}
            style={{ margin: "20px 0" }}
          >
            Редагувати аватар викладача
          </Button>
        </Form>
      </Col>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Ім'я</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={editTeacher.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Призвіще</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={editTeacher.surname}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Опис</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={editTeacher.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div style={{ padding: "20px 0" }}>
          <Button variant="primary" type="submit">
            Редагувати текстові дані викладача
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default TeacherProfilePage;
