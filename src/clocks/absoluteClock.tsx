import React from 'react'

import {useTime} from "../hooks/useTime";
import {getDayOfYear, getHours, getMinutes, getSeconds} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";

export const AbsoluteClock = () => {
    const now = useTime(1000)
    const days = getDayOfYear(now)
    const secondsUntilToday = (days - 1) * 24 * 60 * 60;
    const secondsToday = getSeconds(now) + getMinutes(now) * 60 + getHours(now) * 60 * 60;
    const totalSeconds = secondsUntilToday + secondsToday;

    const name = 'Absolute time'
    const description = `Why do we even arbitrarily divide time up into parts of 24 and 60?  I find
            it much more convenient to use the absolute number of seconds since the start of the year
            (which, when I think about it, also seems fairly arbitrary).
            This approach to time also has the potential to remove the need for numbering years in the future.
            It will also be really convenient to count time in a way that doesn't reset every earth day as we move
            into the space age.`
    return (
        <DigitalClock time={totalSeconds} name={name} description={description}/>
    )
};
