import React, {useState} from 'react'
import {ClockAttribute, ClockDescription, ClockName, ClockWrapper} from "./clockTemplate";
import styled from "@emotion/styled";

interface DigitalClockProps {
    name: string;
    time: string | number | JSX.Element;
    description: string;
}

export const DigitalClock = (props: DigitalClockProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <ClockWrapper
            isExpanded={isExpanded}
            tabIndex={0}
            onClick={() => setIsExpanded(!isExpanded)}
            onBlur={() => setIsExpanded(false)}
        >
            <ClockName>
                {props.name}
            </ClockName>
            <DigitalClockTime>
                {props.time}
            </DigitalClockTime>
            <ClockDescription isExpanded={isExpanded}>
                <hr/>
                <p>{props.description}</p>
            </ClockDescription>
        </ClockWrapper>
    )
};

const DigitalClockTime = styled(ClockAttribute)`
  font-size: 1.75em;
  margin-top: 1em;
  text-overflow: ellipsis;
`;