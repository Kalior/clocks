import React, {useEffect, useState} from 'react'
import bcrypt from 'bcryptjs'

import {useTime} from "../hooks/useTime";
import {getHours, getMinutes} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";

export const HashClock = () => {
    const now = useTime(10000)

    const [hash, setHash] = useState("")


    useEffect(() => {
        const time =
            getHours(now).toString() + ":" + getMinutes(now).toString()

        bcrypt.hash(time, 10, (err, hash) => {
            setHash(hash)
        })

    }, [now])

    const description = `The hashed and salted version of the current hour and minute.
            Really useful if you, for instance, wanted to store the current time
            securely in a database.`
    return (
        <div className='clock hash-clock'>
            <DigitalClock time={hash} name={'Hash Clock'} description={description}/>
        </div>
    )
}
