import React from 'react'
import Moment from 'moment'
import DigitalClock from '../templates/digitalClock.jsx'

export default function AbsoluteClock(props) {
    const days = Moment().dayOfYear()
    const secondsUntilToday = (days - 1) * 24 * 60 * 60;
    const secondsToday = props.currentSecond + props.currentMinute * 60 + props.currentHour * 60 * 60;
    const totalSeconds = secondsUntilToday + secondsToday;

    const name = 'Absolute time'
    const description = `We do we even arbitrarily divide time up into parts of 24 and 60?  I find
            it much more convenient to use the absolute number of seconds since the start of the year
            (which, when I think about it, also seems fairly arbitrary).
            This approach to time also has the potential to remove the need for numbering years in the future.
            It will also be really convenient to count time in a way that doesn't reset every earth day as we move
            into the space age.`
    return (
        <DigitalClock time={totalSeconds} name={name} description={description} />
    )
}
