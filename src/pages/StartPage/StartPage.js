import React from "react";
import {} from "./StartPage.js";
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
      title: "Програмування",
      count: "1 курс",
      image: courseBg,
    },
    {
      title: "Програмування",
      count: "1 курс",
      image: courseBg,
    },
    {
      title: "Програмування",
      count: "1 курс",
      image: courseBg,
    },
    {
      title: "Програмування",
      count: "1 курс",
      image: courseBg,
    },
    {
      title: "Програмування",
      count: "1 курс",
      image: courseBg,
    },
    {
      title: "Програмування",
      count: "1 курс",
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
                  <CourseTitle>{item.title}</CourseTitle>
                  <CourseType>{item.count}</CourseType>
                  <CourseImage>
                    <img src={item.image} />
                  </CourseImage>
                </Course>
              );
            })}
          </CoursesList>

          <SeeAllButton>
            <button>Більше</button>
          </SeeAllButton>
        </Container>
      </CoursesSection>
    </>
  );
};

export default StartPage;
