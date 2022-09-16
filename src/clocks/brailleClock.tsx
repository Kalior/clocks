import React from 'react'
// @ts-ignore
import Braille from 'braille'
import {DigitalClock} from "../templates/digitalClock";
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";

export const BrailleClock = () => {
    const now = useTime(1000)
    const currentSecond = getSeconds(now)
    const currentMinute = getMinutes(now)
    const currentHour = getHours(now)

    let hourBraille = Braille.toBraille(currentHour.toString())
    let minuteBraille = Braille.toBraille(currentMinute.toString())
    let secondBraille = Braille.toBraille(currentSecond.toString())
    let zeroBraille = Braille.toBraille('0')
    let hourBrailleTime = currentHour < 10 ? zeroBraille + hourBraille : hourBraille
    let minuteBrailleTime = currentMinute < 10 ? zeroBraille + minuteBraille : minuteBraille
    let secondBrailleTime = currentSecond < 10 ? zeroBraille + secondBraille : secondBraille
    let time = hourBrailleTime + ':' + minuteBrailleTime + ':' + secondBrailleTime

    const description = `In order to highlight one of the more common uncommon writing systems, this clock
      displays time using braille in six dot notation. So even though this clock actually displays time
      it does so in a way that most people can't read. I wouldn't be surprised if fewer people can read this
      clock than the Roman clock. If you can read this one, good on you!
      Also, isn't it ironic to display braille on a flat screen?`
    return <DigitalClock time={time} name={'Braille Clock'} description={description}/>


}
