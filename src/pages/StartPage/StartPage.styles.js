import styled from "styled-components";

import heroBackground from "../../assets/heroBackground.png";

export const Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
`;
export const HeroBackground = styled.div`
  position: relative;
  background: url(${heroBackground}) center/cover no-repeat;
  height: 100%;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3px;
  height: 100%;
  width: 100%;
  color: white;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.55);
  letter-spacing: 0.1em;
  margin: 0 0 20px 0;
  color: black;
`;

export const Subtitle = styled.div`
  color: black;
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.55);
`;

export const CoursesSection = styled.div`
  background-color: black;
  padding: 50px 0;
`;

export const Container = styled.div`
  padding: 0 200px;
`;

export const CoursesTitle = styled.div`
  font-size: 36px;
  line-height: 44px;
  color: white;
  text-align: center;
  padding: 20px 0;
`;

export const CoursesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const Course = styled.div`
  background-image: linear-gradient(blue, black);
  border-radius: 16px;
  padding-top: 10px;
  padding-left: 10px;
  padding: 10px;
  max-width: 310px;
`;

export const CourseTitle = styled.div`
  font-size: 30px;
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const CourseType = styled.div`
  font-size: 20px;
  color: white;
`;
export const CourseImage = styled.div``;

export const SeeAllButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  button {
    a {
      padding: 10px;
      border-radius: 16px;
      font-size: 20px;
      background-color: blue;
      color: white;
    }
  }
`;
