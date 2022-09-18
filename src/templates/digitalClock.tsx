import React from 'react'
import {ClockAttribute, ClockDescription, ClockName, Line, TextWrapper} from "./clockTemplate";
import styled from "@emotion/styled";

interface DigitalClockProps {
    name: string;
    time: string | number | JSX.Element;
    description: string;
}

export const DigitalClock = (props: DigitalClockProps) => {

    return (
        <>
            <DigitalClockTime>
                {props.time}
            </DigitalClockTime>
            <TextWrapper>
                <ClockName>
                    {props.name}
                </ClockName>
                <ClockDescription>
                    <Line/>
                    <p>{props.description}</p>
                </ClockDescription>
            </TextWrapper>
        </>
    )
};

const DigitalClockTime = styled(ClockAttribute)`
  font-size: 1.75rem;

  word-break: normal;

`;
