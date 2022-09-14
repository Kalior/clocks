import React from 'react'
import {ColorClockTemplate} from '../templates/colorClockTemplate'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";
import styled from "@emotion/styled";
import {DigitalClock} from "../templates/digitalClock";

export const ColorClock = () => {
    const now = useTime(1000)
    let red = Math.floor(getHours(now) / 23 * 255)
    let green = Math.floor(getMinutes(now) / 59 * 255)
    let blue = Math.floor(getSeconds(now) / 59 * 255)

    let hourDiv = <ColorElement style={{background: `rgb(${red}, 0, 0)`}}/>
    let minuteDiv = <ColorElement style={{background: `rgb(0, ${green}, 0)`}}/>
    let secondDiv = <ColorElement style={{background: `rgb(0, 0, ${blue})`}}/>

    const colorElement = <>
        <div>
        {hourDiv}{minuteDiv}{secondDiv}
        </div>
        <GlassSlide />
    </>

    let description = 'Imagine, if you will, a clock that shows the time as a color.  I know this may seem alien,' +
        'but no more do we have to linger in the color-less watch faces of our past. I hereby present revolutionary new clock in ' +
        'full technicolor, with the individual RGB components.'
    let name = 'Technicolor Clock'
    return (
        <DigitalClock name={name} description={description} time={colorElement}/>
    )
};

const ColorElement = styled.div`
  display: inline-block;
  height: 2em;
  width: 2em;
`;

const GlassSlide = styled.div`
  backdrop-filter: blur(0.1rem);
  position: relative;
  height: 5.5rem;
  background: #f7f7f724;
  border-radius: 1rem;
  margin-top: -4.6rem;
  margin-left: -2rem;
  width: 14rem;
`;