import React from 'react'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";

export const WrongOrderClock = () => {
    const now = useTime(1000)

    let seconds = getSeconds(now).toString()
    if (getSeconds(now) < 10) {
        seconds = '0' + seconds
    }
    let minutes = getMinutes(now).toString()
    if (getMinutes(now) < 10) {
        minutes = '0' + minutes
    }
    let hours = getHours(now).toString()
    if (getHours(now) < 10) {
        hours = '0' + hours
    }
    const randTime = `${minutes}:${seconds}:${hours}`
    const description = 'This clock simply displays the hour, minute and seconds in the wrong order. Really confusing to look at...'
    return (
        <div className='random-clock clock'>
            <DigitalClock time={randTime} name={'Flipped Clock'} description={description}/>
        </div>
    )
};
