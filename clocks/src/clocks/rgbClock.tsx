import React from 'react'
import {ColorClockTemplate} from '../templates/colorClockTemplate'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";

export const RGBClock = () => {
    const now = useTime(1000)
    let red = Math.floor(getHours(now) / 23 * 255)
    let green = Math.floor(getMinutes(now) / 59 * 255)
    let blue = Math.floor(getSeconds(now) / 59 * 255)
    let color = 'rgb(' + red + ',' + green + ',' + blue + ')'

    let clockStyle = {
        background: 'radial-gradient(circle, ' + color + '40%, rgba(255,255,255,0) 60%)'
    }

    let description = 'This clock displays the current time as an RGB value where red is the hour, green is the minute and blue is the second. ' +
        'So, in order to read this clock you will have to be fluent in RGB, and be able to appreciate subtle color differences.'
    let name = 'RGB Clock'
    return <ColorClockTemplate name={name} description={description} clockStyle={clockStyle}/>

};
