import React, {useState} from 'react'
import styled from "@emotion/styled";
import {ClockAttribute, ClockDescription, ClockName, ClockWrapper} from "./clockTemplate";

interface ColorClockTemplateProps {
    name: string;
    clockStyle: React.CSSProperties;
    description: string;
}

export const ColorClockTemplate = (props: ColorClockTemplateProps) => {
    const [isExpanded, setIsExpanded] = useState(false);


    return (<ClockWrapper
            isExpanded={isExpanded}
            tabIndex={0}
            onClick={() => setIsExpanded(!isExpanded)}
            onBlur={() => setIsExpanded(false)}
        >
            <ClockName>
                {props.name}
            </ClockName>
            <ClockAttribute>
                <ColorClock style={props.clockStyle}/>
            </ClockAttribute>
            <ClockDescription isExpanded={isExpanded}>
                <hr/>
                {props.description}
            </ClockDescription>

        </ClockWrapper>
    )
};

const ColorClock = styled.div`
  width: 5em;
  height: 5em;
  align-self: center;
  margin: 0 auto;
`;



