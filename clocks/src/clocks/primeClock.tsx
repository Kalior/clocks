import React from 'react'

import _ from 'lodash'
import {DigitalClock} from "../templates/digitalClock";
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";

export const PrimeClock = () => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59]

    const now = useTime(1000)
    const currentSecond = getSeconds(now)
    const currentMinute = getMinutes(now)
    const currentHour = getHours(now)

    let secondText = _.includes(primes, currentSecond) ? currentSecond : ''
    let minuteText = _.includes(primes, currentMinute) ? currentMinute : ''
    let hourText = _.includes(primes, currentHour) ? currentHour : ''

    let metricTime = hourText + ':' + minuteText + ':' + secondText
    let description = 'As a student of Computer Science and Engineering, I have understood the importance of ' +
        'prime numbers in the world. So what this clock does, is it highlights the unsung use of prime numbers, namely ' +
        'in the clocks we view everyday. Simply put, the clock only displays the digit if it is prime, resulting ' +
        'in a clock that stands above all other clock in its beauty.'
    return (
        <div className='clock'>
            <DigitalClock time={metricTime} name={'Prime Clock'} description={description}/>
        </div>
    )
}
