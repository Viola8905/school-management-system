import React from "react";
import { Link } from "react-router-dom";

import courseBg from "../../assets/course-card-bg.png";
import {
  Container,
  Course,
  CourseImage,
  CourseTitle,
  CourseType,
  CoursesList,
  CoursesSection,
  CoursesTitle,
  HeroBackground,
  Section,
  SeeAllButton,
  Subtitle,
  Title,
  Wrapper,
} from "./StartPage.styles.js";
const StartPage = () => {
  const courses = [
    {
      id: "1",
      title: "Course 1",
      category: "Design",
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
  return (
    <>
      <Wrapper>
        <HeroBackground>
          <Section>
            <Title>IT Academy</Title>
            <Subtitle>Якісне навчання для дорослих та дітей</Subtitle>
          </Section>
        </HeroBackground>
      </Wrapper>

      <CoursesSection>
        <Container>
          <CoursesTitle>Освітні програми</CoursesTitle>

          <CoursesList>
            {courses.map((item) => {
              return (
                <Course>
                  <CourseTitle>{item.category}</CourseTitle>
                  <CourseType>{item.count}</CourseType>
                  <CourseImage>
                    <img src={item.image} />
                  </CourseImage>
                </Course>
              );
            })}
          </CoursesList>

          <SeeAllButton>
            <button>
              <Link to="/all-courses">Дивитися всі курси</Link>
            </button>
          </SeeAllButton>
        </Container>
      </CoursesSection>
    </>
  );
};

export default StartPage;
