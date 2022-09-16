import React, {useState} from 'react'
import {ColorClockTemplate} from '../templates/colorClockTemplate'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";

export const HSLClock = () => {

    const now = useTime(1000)

    const hue = Math.floor(getHours(now) / 23 * 360)
    const sat = getMinutes(now) + 20
    const light = getSeconds(now) + 20
    const color = 'hsl(' + hue + ',' + sat + '%,' + light + '%)'

    const clockStyle = {
        background: 'radial-gradient(circle, ' + color + '40%, rgba(255,255,255,0) 60%)'
    }

    const description = `This clock displays the current time as an HSL value in a similar fashion to the RGB Clock.
      However, in an attempt to make this a more reasonable clock, the saturation and lightness percentage
      is in the range [20,79]. I do find, however, that this clock is easier to read than the RGB one,
      mainly beacuse every hour, the hue is the
      same while only the lightness and saturation is differing with minute and second.`
    const name = 'HSL Clock'
    return (
        <ColorClockTemplate
            name={name}
            description={description}
            clockStyle={clockStyle}
        />


    )
};
