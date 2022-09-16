import React from 'react'
import {DigitalClock} from "../templates/digitalClock";
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";

export const PomodoroClock = () => {
    const now = useTime(1000)
    const currentSecond = getSeconds(now)
    const currentMinute = getMinutes(now)
    const currentHour = getHours(now)
    const minutesSinceMidnight = currentHour * 60 + currentMinute

    const pomondoroCycles = Math.floor(minutesSinceMidnight / 30)
    const currentCycle = minutesSinceMidnight % 30
    const currentlyBreak = currentCycle >= 25

    const pomondoroWorkMinute = currentlyBreak ? '0' : currentCycle
    const pomondoroBreakMinute = currentlyBreak ? currentCycle - 25 : '0'

    const time = pomondoroCycles + ':' + pomondoroWorkMinute + ':' + pomondoroBreakMinute + ':' + currentSecond

    const name = 'Pomodoro Clock'
    const description = `If you're a skilled procrastinator, you may have had Francesco Cirillo's
      Pomodoro technique recommended to you. If you've not heard of it before, it
      is a system designed to help focus on a task by dividing time into intervals.
      Each period consists of 25 minutes of work interleaved with roughly 5 minutes of rest.
      After 4 Pomodoro cycles, the method suggests a longer break.
      This clock uses the Pomodoro method to display the time. The most significant indicator represents
      the number of Pomodoro cycles since midnight, the second is counting up to 25 and the third to 5,
      mutually exclusive.`
    return <DigitalClock time={time} name={name} description={description}/>

}
