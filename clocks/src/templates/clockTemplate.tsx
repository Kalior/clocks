import styled from "@emotion/styled";
import {css} from "@emotion/react";

export const ClockWrapper = styled.div<DescriptionProps>`
  padding: 2rem;
  width: 11rem;
  height: 5rem;
  word-break: break-all;
  font-size: 1em;

  border-style: solid;
  border-width: 2px;
  border-color: rgba(238, 237, 242, 0.18) rgba(238, 237, 242, 0.34) rgba(238, 237, 242, 0.34);
  border-radius: 2em;
  backdrop-filter: blur(0.8rem);
  background-image: linear-gradient(144deg, rgba(238, 237, 242, 0.3), hsla(0, 0%, 100%, 0) 60%, rgba(0, 0, 0, 0.06));
  
  margin-top: 2em;
  transform-style: preserve-3d;
  animation: transform 300ms;
  

  &:hover {
    cursor: pointer;
    z-index: 2;
    border-radius: 33px;
    box-shadow: 7px 7px 14px #51504fa3, -7px -7px 14px #ffffff4f;
    position: absolute;
    backdrop-filter: blur(2rem);
  }

  ${props => props.isExpanded && css`
    cursor: pointer;
    z-index: 2;
    border-radius: 33px;
    backdrop-filter: blur(2rem);
    box-shadow: 7px 7px 14px #51504fa3, -7px -7px 14px #ffffff4f;
    position: absolute;

    height: fit-content;
    width: 26em;
    padding: 2em;
  `}
`;

export const ClockAttribute = styled.div`
  //align-self: center;
`;

export const ClockName = styled.p`
  color: #737272;
  text-align: left;
  margin: 0;
`;

export interface DescriptionProps {
    isExpanded: boolean;
}

export const ClockDescription = styled.div<DescriptionProps>`
  text-align: left;
  max-width: 50em;
  font-size: 1em;
  margin-top: 1em;
  display: ${props => props.isExpanded ? "block" : "none"};
`;