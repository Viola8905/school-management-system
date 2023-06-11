import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  AboutCourseS,
  AboutDescription,
  AboutTitle,
  HeroBackground,
  Section,
  Subtitle,
  Title,
  Wrapper,
} from "./SingleCoursePage.styles";
import { Button, Card } from "react-bootstrap";
import {
  createCourseApplicationRequest,
  getAllCoursesRequest,
  getUserCoursesApplicationsRequest,
} from "../../apiCalls/coursesRequests";
import { useSelector } from "react-redux";
import axios from "axios";

const SingleCoursePage = () => {
  const courseId = useParams().id;
  const [course, setCourse] = React.useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [application, setApplication] = React.useState([]);
  const [courseTeacher, setCourseTeacher] = React.useState([]);
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCoursesRequest();
        const course = response.find((item) => item._id === courseId);
        setCourse(course);

        axios
          .get(`http://localhost:3001/api/users/getById/${course.lector}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            function correctWebPath(pathString) {
              return pathString.replace(/\\\\/g, "/").replace(/\\/g, "/");
            }

            const inputPath = res.data.avatar;
            const correctedPath = correctWebPath(inputPath);
            res.data.avatar = correctedPath;
            setCourseTeacher(res.data);
          })
          .catch((err) => alert(err));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      const fetchApplications = async () => {
        const data = await getUserCoursesApplicationsRequest(currentUser.id);
        const courseApplication = data.find(
          (item) => item.courseId === courseId
        );

        setApplication(courseApplication);
      };
      fetchApplications();
    }
  }, []);

  const createCourseApplicationHandler = async (requestData) => {
    const createCourse = createCourseApplicationRequest(requestData);
    await createCourse(requestData);
    setApplication({ status: 0 });
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div>
      <Wrapper>
        <HeroBackground>
          <Section>
            <p>Курс</p>
            <Title>{course.title}</Title>
            <Subtitle>{course.description}</Subtitle>
            <p>
              Дата проведення: {formatDate(course.startDate)} -{" "}
              {formatDate(course.endDate)}
            </p>
            <div style={{ padding: "20px 0" }}>
              {currentUser.role === "user" &&
                (application?.status === 0 ? (
                  <Button variant="info" size="lg">
                    Заявка на розгляді
                  </Button>
                ) : application?.status === 1 ? (
                  <Button variant="success" size="lg">
                    Заявку на курс прийнято
                  </Button>
                ) : application?.status === 2 ? (
                  <Button variant="danger" size="lg">
                    Заявка на курс відхилена
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      if (currentUser.id) {
                        createCourseApplicationHandler({
                          applicantId: currentUser.id,
                          courseId: course._id,
                        });
                      } else {
                        alert("Аби подати заявку на курс пройдіть логінізацію");
                      }
                    }}
                  >
                    Подати заявку
                  </Button>
                ))}
              {!isAuth && (
                <Button variant="info" size="lg">
                  Залогіньтеся аби подати заявку на курс
                </Button>
              )}
            </div>
          </Section>
        </HeroBackground>
      </Wrapper>
      <AboutCourseS>
        <AboutTitle>Про курс</AboutTitle>
        <AboutDescription>
          Курс для тих, хто має намір отримати професію розробника. Ви пройдете
          шлях від вивчення основ програмування до працевлаштування. Навчитеся
          програмувати найпопулярнішими мовами, верстати сайти, створювати
          мобільні та web-додатки, розробляти ігри, створювати архітектуру,
          управляти проектами та багато іншого. Навички та знання, які ви
          отримаєте на курсі дозволять вам працювати з будь-якої точки світу та
          бути затребуваним, високооплачуваним фахівцем.
        </AboutDescription>
      </AboutCourseS>

      <div
        style={{
          backgroundColor: "#020120",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AboutTitle>Викладач курсу</AboutTitle>
        <Card style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src={`http://localhost:3001/${courseTeacher.avatar}`}
          />
          <Card.Body>
            <Card.Title>{`${courseTeacher.name} ${courseTeacher.surname}`}</Card.Title>
            <Card.Text>{courseTeacher.description}</Card.Text>
          </Card.Body>
        </Card>
        s
      </div>
    </div>
  );
};

export default SingleCoursePage;
