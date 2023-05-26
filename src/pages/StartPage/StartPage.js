import React, { useEffect } from "react";
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
import { getAllCoursesRequest } from "../../apiCalls/coursesRequests";
const StartPage = () => {
  const [categories, setCatgories] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCoursesRequest();
        const categories = [
          ...new Set(response.map((course) => course.category)),
        ];
        setCatgories(categories);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

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
            {categories.map((item) => {
              return (
                <Course>
                  <CourseTitle>{item}</CourseTitle>
                  <CourseType>{item.count}</CourseType>
                  <CourseImage>
                    <img src={courseBg} />
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
