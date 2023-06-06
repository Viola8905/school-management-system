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
import { Button} from "react-bootstrap";
import {
  createCourseApplicationRequest,
  getAllCoursesRequest,
  getUserCoursesApplicationsRequest,
} from "../../apiCalls/coursesRequests";
import { useSelector } from "react-redux";

const SingleCoursePage = () => {
  const courseId = useParams().id;
  const [course, setCourse] = React.useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [application, setApplication] = React.useState([]);

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
  console.log(course);

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
                  <div></div>
                ))}
              
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
    </div>
  );
};

export default SingleCoursePage;
