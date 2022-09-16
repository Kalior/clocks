import React from 'react'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";

export const FikaClock = () => {
  const now = useTime(100)
  const currentMinute = getMinutes(now)
  const currentHour = getHours(now)
  let time = "It's not fika"
  if ((currentHour === 10 && currentMinute <= 30) ||
      (currentHour === 9 && currentMinute >= 30) ||
      (currentHour === 14 && currentMinute >= 30) ||
      (currentHour === 15 && currentMinute <= 30)) {
    time = "It's fika!"
  }

  let description = "In Sweden, we worship the god of fika.  Everyday at 10 and 15 o'clock, we sacrifice " +
      "15 to 30 minutes and devour a cup of coffee and some cake. This clock, thus, reminds us of this ancient " +
      "tradition and highlights those two imperative hours of the day."
  return (
        <DigitalClock time={time} name={'Fika Clock'} description={description}/>
  )
};
