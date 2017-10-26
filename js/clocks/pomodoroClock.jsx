import React from 'react'
import DigitalClock from '../templates/digitalClock.jsx'

export default class PomodoroClock extends React.Component {
  render () {
    const {currentHour, currentMinute, currentSecond} = this.props
    const minutesSinceMidnight = currentHour * 60 + currentMinute

    const pomondoroCycles = Math.floor(minutesSinceMidnight / 30)
    const currentCycle = minutesSinceMidnight % 30
    const currentlyBreak = currentCycle >= 25

    const pomondoroMinute = currentlyBreak ? currentCycle - 25 : currentCycle
    const pomondoroWorkMinute = currentlyBreak ? '0' : currentCycle
    const pomondoroBreakMinute = currentlyBreak ? currentCycle - 25 : '0'

    const time = pomondoroCycles + ':' + pomondoroWorkMinute + ':' + pomondoroBreakMinute + ':' + currentSecond

    const name = 'Pomodoro clock'
    const description = `If you're a skilled procrastinator, you may have had the
      Pomodoro technique recommended to you. If you've not heard of it before, it
      is a system where time is divided into intervals and was developed by Francesco Cirillo.
      Each period consists of 25 minutes of work interleaved with roughly 5 minutes of rest.
      After 4 Pomodoro cycles, the method suggests a longer break.
      This clock uses the Pomodoro method to display the time. The most significant indicator represents
      the number of Pomodoro cycles since midnight, the second is counting up to 25 and the third to 5,
      mutually exclusive.`
    return (
      <DigitalClock time={time} name={name} description={description} />
    )
  }
}
