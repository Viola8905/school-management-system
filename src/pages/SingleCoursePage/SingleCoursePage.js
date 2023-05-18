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
import { Button } from "react-bootstrap";
import { getAllCoursesRequest } from "../../apiCalls/coursesRequests";

const SingleCoursePage = () => {
  const courseId = useParams().id;
  const [course, setCourse] = React.useState([]);

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

  return (
    <div>
      <Wrapper>
        <HeroBackground>
          <Section>
            <Title>{course.title}</Title>
            <Subtitle>{course.description}</Subtitle>
            <div style={{ padding: "20px 0" }}>
              <Button variant="primary" size="lg">
                Записатися на курс
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
