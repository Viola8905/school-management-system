import styled from "styled-components";
import heroBackground from "../../assets/single-course-hero-bg.png"

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
  align-items: start;
  padding: 0 30px;
  height: 100%;
  width: 100%;
  color: white;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.55);
  letter-spacing: 0.1em;
  margin: 0 0 20px 0;
  color: white;
`;

export const Subtitle = styled.div`
  color: white;
  font-size: 30px;
  font-weight: 400;
  text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.55);
`;

export const AboutCourseS = styled.div`
  display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
  background-color: #020120;
	padding: 30px 50px;
`;

export const AboutTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.55);
  letter-spacing: 0.1em;
  margin: 0 0 20px 0;
  color: white;
`;
export const AboutDescription = styled.div`
  font-size: 20px;
  font-weight: 500;
  text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.55);
  margin: 0 0 20px 0;
  color: #a7a7ac;
  text-align: center;
`;