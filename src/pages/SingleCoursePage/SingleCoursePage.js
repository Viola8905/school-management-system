import React from "react";
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

const SingleCoursePage = () => {
  const courseId = useParams().id;
  const courses = [
    {
      id: "1",
      title: "Course 1",
      category: "All Courses",
      description: "This is the first course.",
    },
    {
      id: "2",
      title: "Course 2",
      category: "Programming",
      description: "This is a programming course.",
    },
    {
      id: "3",
      title: "Course 3",
      category: "Marketing",
      description: "This is a marketing course.",
    },
  ];
  const course = courses.find((item) => item.id === courseId);

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
