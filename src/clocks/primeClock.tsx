import React from 'react'

import _ from 'lodash'
import {DigitalClock} from "../templates/digitalClock";
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";
import {padNumber} from "../padding";

export const PrimeClock = () => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59]

    const now = useTime(1000)
    const currentSecond = getSeconds(now)
    const currentMinute = getMinutes(now)
    const currentHour = getHours(now)

    const secondText = _.includes(primes, currentSecond) ? padNumber(currentSecond) : '  '
    const minuteText = _.includes(primes, currentMinute) ? padNumber(currentMinute) : '  '
    const hourText = _.includes(primes, currentHour) ? padNumber(currentHour) : '  '

    const metricTime = <div style={{width: "111px"}}>{hourText + ':' + minuteText + ':' + secondText}</div>
    const description = 'As we all know, the prime numbers are basically gods and demand our worship. Therefore,' +
        ' this clock highlights one place where prime numbers appear to shine some light on our days. This clock ' +
        'only displays the digit if it is prime, resulting in a clock that stands above all other clocks in its beauty.'
    return <DigitalClock time={metricTime} name={'Prime Clock'} description={description}/>
}
