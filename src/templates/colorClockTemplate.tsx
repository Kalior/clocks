import React from 'react'
import styled from "@emotion/styled";
import {ClockAttribute, ClockDescription, ClockName, Line, TextWrapper} from "./clockTemplate";
import Tilt from 'react-parallax-tilt';

interface ColorClockTemplateProps {
    name: string;
    clockStyle: React.CSSProperties;
    description: string;
}

export const ColorClockTemplate = (props: ColorClockTemplateProps) => {
    return <>

        <ClockAttribute>
            <ColorClock style={props.clockStyle}/>
        </ClockAttribute>


        <TextWrapper>
            <ClockName>
                {props.name}
            </ClockName>
            <ClockDescription>
                <Line/>
                {props.description}
            </ClockDescription>
        </TextWrapper>
    </>

};

const ColorClock = styled.div`
  width: 5em;
  height: 5em;
`;



