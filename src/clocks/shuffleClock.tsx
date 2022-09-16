import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import seed from "seed-random";
import {DigitalClock} from "../templates/digitalClock";
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";

export const ShuffleClock = () => {
    const now = useTime(1000)
    const currentSecond = getSeconds(now)
    const currentMinute = getMinutes(now)
    const currentHour = getHours(now)

    const [scrambledClock, setScrambledClock] = useState<string[]>([])

    useEffect(() => {
        const seedVal = (currentHour * 100) + currentMinute
        seed(seedVal.toString(), {global: true})
        const order = [0, 1, 2, 3, 4, 5].sort(() => {
            return 0.5 - Math.random()
        })

        let arrayTime: number[] = []

        const appendToArrayTime = (time: number) => {
            if (time < 10) {
                arrayTime.push(0)
                arrayTime.push(time)
            } else {
                arrayTime.push(Math.floor(time / 10))
                arrayTime.push(time % 10)
            }
        }

        appendToArrayTime(currentHour)
        appendToArrayTime(currentMinute)
        appendToArrayTime(currentSecond)

        let scrambledClock: string[] = _.chain(order)
            .zip(arrayTime)
            .sortBy(tuple => tuple[0])
            .map(tuple => tuple[1]!.toString())
            .value()

        scrambledClock.splice(4, 0, ':')
        scrambledClock.splice(2, 0, ':')
        setScrambledClock(scrambledClock)
    }, [now])


    const randTime = String(scrambledClock.join(''))
    const description = `
    This clock shuffles the positions of the numbers
     and it is actually possible to read the time from this one.
     The seconds reveals themselves almost at once. The position for
     the first minute number is also tolerable to wait for.
     After this, however, things gets tedious.
     You might be able to exclude some digits from some positions,
     e.g. the position representing tenths of hours cannot go above '2'.
    `
    return <DigitalClock time={randTime} name={'Shuffle Clock'} description={description}/>
}
