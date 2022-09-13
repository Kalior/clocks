import React, {useEffect, useState} from 'react'
import seed from "seed-random"

import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";

export const ScrambledClock = () => {
    const now = useTime(1000)
    const currentSecond = getSeconds(now)
    const currentMinute = getMinutes(now)
    const currentHour = getHours(now)

    const [hourStr, setHourStr] = useState("")
    const [minuteStr, setMinuteStr] = useState("")

    useEffect(() => {
        randomTime(currentMinute, currentHour)

    }, [currentMinute])
    const randomTime = (currentMinute: number, currentHour: number) => {
        const hour = Math.floor(seededRandom(0, 23, currentMinute, currentHour))
        const minute = Math.floor(seededRandom(0, 59, currentMinute, currentHour))
        let nextHourStr = hour.toString()
        if (hour < 10) {
            nextHourStr = '0' + nextHourStr
        }
        let nextMinuteStr = minute.toString()
        if (minute < 10) {
            nextMinuteStr = '0' + nextMinuteStr
        }
        setMinuteStr(nextMinuteStr)
        setHourStr(nextHourStr)
    }
    const seededRandom = (max: number, min: number, minute: number, hour: number) => {
        const seedVal = (hour * 100) + minute
        seed(seedVal.toString(), {global: true})
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    let seconds = currentSecond.toString()
    if (currentSecond < 10) {
        seconds = '0' + seconds
    }
    const randTime = `${hourStr}:${minuteStr}:${seconds}`
    const description = 'This is a clock that randomly takes a number and displays that as the time every minute. However, the random number generator ' +
        "bases it's seed upon the actual minute and hour, which basically can be interpreted as scrambling the time. For instance, every day when the " +
        'clock is 20:28, this clock displays 22:56. In theory, this makes it possible to memorize how to tell time using this clock, which I think is a great use of your time.'
    return (
        <div className='random-clock clock'>
            <DigitalClock time={randTime} name={'Scrambled Clock'} description={description}/>
        </div>
    )

}
