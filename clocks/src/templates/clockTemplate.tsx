import styled from "@emotion/styled";
import {css} from "@emotion/react";

export const ClockWrapper = styled.div<DescriptionProps>`
  border-radius: 2px;
  margin-bottom: 1em;
  padding: 0.5em;
  transition: all 300ms;
  width: 16em;
  height: 9em;
  word-break: break-all;
  font-size: 1em;

  &:hover {
    background-color: #fafafa;
    cursor: pointer;
    z-index: 2;
    box-shadow: 2px 4px 8px 4px rgba(0, 0, 0, 0.2);
    position: absolute;
  }
  ${props => props.isExpanded && css`
    background-color: #fafafa;
    cursor: pointer;
    z-index: 2;
    box-shadow: 2px 4px 8px 4px rgba(0, 0, 0, 0.2);
    transform: scale(1.2) translate(-6em);
    position: absolute;

    height: fit-content;
    width: 26em;
    padding: 1em 2em 1em 2em;
  `}
`;

export const ClockAttribute = styled.div`
  align-self: center;
`;

export const ClockName = styled.h2`
  color: #544338;
  font-size: 1.75em;
  font-weight: 200;
  letter-spacing: -1px;
`;

export interface DescriptionProps {
    isExpanded: boolean;
}
export const ClockDescription = styled.div<DescriptionProps>`
  text-align: center;
  max-width: 50em;
  font-size: 1em;
  line-height: 1.5;
  transition: opacity 500ms;
  opacity: ${props => props.isExpanded ? 1.0 : 0.0};
  display: ${props => props.isExpanded ? "block" : "none"};
  
`;