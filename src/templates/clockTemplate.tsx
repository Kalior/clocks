import styled from "@emotion/styled";
import Tilt from "react-parallax-tilt";

export const ClockWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;

  padding: 2rem;
  width: 60vw;
  height: fit-content;
  word-break: break-all;
  font-size: 1em;

  margin-top: 10vh;
  margin-bottom: 40vh;
  transform-style: preserve-3d;
  animation: transform 300ms;

`;

export const ClockAttribute = styled(Tilt)`
  justify-self: end;

  width: fit-content;
  padding: 2rem;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(2em);
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: #f7f7f724;
`;

export const ClockName = styled.h1`
  color: #000;
  text-align: left;
  margin: 0;
`;

export const ClockDescription = styled.div`
  text-align: left;
  max-width: 50em;
  font-size: 1em;
  margin-top: 1em;
`;

export const GlassSlide = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(0.5px);
  border: 1px solid rgba(255, 255, 255, 0.72);
  position: relative;
  height: 14rem;
  background: #f7f7f724;
  margin-top: -4.6rem;
  margin-left: -2rem;
  width: 14rem;
`;

export const Line = styled.hr`
  margin-top: -1.4rem;
  border: 0;
  height: 1px;
  background: #333;
`;

export const TextWrapper = styled(Tilt)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(2em);
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: #f7f7f724;
  padding: 6rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;