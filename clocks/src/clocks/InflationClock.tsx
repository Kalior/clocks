import React from 'react'
import {DigitalClock} from "../templates/digitalClock";
import {useTime} from "../hooks/useTime";
import {getHours, getMilliseconds, getMinutes, getSeconds} from "date-fns";
import {padNumber} from "../padding";

export const InflationClock = () => {
    const now = useTime(10)
    const currentSecond = getSeconds(now)
    const currentMinute = getMinutes(now)
    const currentHour = getHours(now)

    const millisecondsPerHour = 60000 * 60
    const millisecondsPerMinute = 60 * 1000

    const millisecondsSinceMidnight = getMilliseconds(now) + currentSecond * 1000 + currentMinute * millisecondsPerMinute + currentHour * millisecondsPerHour

    const inflationMultiple = 7.64

    const inflationAdjustedMillisecondsSinceMidnight = millisecondsSinceMidnight * inflationMultiple

    const inflationAdjustedHour = Math.floor(inflationAdjustedMillisecondsSinceMidnight / millisecondsPerHour)
    const minuteRemainder = inflationAdjustedMillisecondsSinceMidnight % millisecondsPerHour
    const inflationAdjustedMinute = padNumber(Math.floor(minuteRemainder / millisecondsPerMinute))
    const secondsRemainder = minuteRemainder % millisecondsPerMinute
    const inflationAdjustedSeconds = padNumber(Math.floor(secondsRemainder / 1000))

    const time = `${inflationAdjustedHour}:${inflationAdjustedMinute}:${inflationAdjustedSeconds}`

    const name = 'Inflation adjusted Clock'
    const description = `Since time is money and money suffers from inflation, I figured it reasonable to look at what  
        would happen to our days if our seconds had a similar rate of inflation as the dollar has.  The 
        purchasing power of $1 USD in 1970 is today (2022) equivalent to the $7.64 USD.  Assuming this holds true for time
        as well, today we have to use 7.64 seconds instead of 1 second to achieve the same amount of time investment.
        We run out of our normal 24-hour day before the clock turns 4, but thankfully the time lizards have added more time so
        there's no need to be worried.
        `
    return <DigitalClock time={time} name={name} description={description}/>

}
