import React, {useEffect, useState} from "react";
import _ from "lodash";
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";

export const CodeFoodClock = () => {
    const now = useTime(100)


    const [time, setTime] = useState("Code")
    useEffect(() => {
        const time = checkTime(now)
        setTime(time)
    })

    const checkTime = (now: Date) => {
        const currentMinute = getMinutes(now)
        const currentHour = getHours(now)

        let time = "Code";
        if (
            _.some([8, 12, 19, 20], t =>
                withinRange(currentHour, currentMinute, t)
            )
        ) {
            time = "Food";
        }
        return time
    }

    const withinRange = (currentHour: number, currentMinute: number, targetHour: number) => {
        return (
            (currentHour === targetHour && currentMinute <= 21) ||
            (currentHour === targetHour - 1 && currentMinute >= 45)
        );
    };


    let description = `Inspired by Skalman's clock (from Bamse, a Swedish cartoon),
      which tells him when to eat and when to sleep.  This clock works similarly, but
      instead of being targeted towards a tortoise capable of inventing almost
      anything, it targets equally capable programmers.  Basically, as a programmer,
      you only need to know two things: when to code and when to eat.  This clock
      tells you exactly that.`;

    return (
        <div className="clock">
            <DigitalClock
                time={time}
                name={"Code/Food Clock"}
                description={description}
            />
        </div>
    );
}
