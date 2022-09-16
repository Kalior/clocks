import React from 'react'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";
import {padNumber} from "../padding";

export const WrongOrderClock = () => {
    const now = useTime(1000)

    const seconds = padNumber(getSeconds(now))
    const minutes = padNumber(getMinutes(now))
    const hours = padNumber(getHours(now))

    const randTime = `${minutes}:${seconds}:${hours}`
    const description = 'This clock simply displays the hour, minute and seconds in the wrong order. Really confusing to look at...'
    return <DigitalClock time={randTime} name={'Flipped Clock'} description={description}/>

};
