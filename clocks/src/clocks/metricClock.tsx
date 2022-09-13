import React from 'react'
import {useTime} from "../hooks/useTime";
import {getHours, getMilliseconds, getMinutes, getSeconds} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";

export const MetricClock = () => {
    const now = useTime(10)

    const totalSeconds = getMilliseconds(now) + (getSeconds(now) * 1000) + (getMinutes(now) * 60 * 1000) + (getHours(now) * 3600 * 1000)
    const totalMetricSeconds = totalSeconds * (100 * 100 * 100 / (24 * 60 * 60))
    const metricHours = Math.floor(totalMetricSeconds / (100 * 100 * 1000))
    const metricMinutes = Math.floor((totalMetricSeconds / (100 * 1000)) % 100)
    const metricSeconds = Math.floor((totalMetricSeconds / 1000) % 100)

    let metricHourText = metricHours.toString()
    let metricMinuteText = metricMinutes.toString()
    let metricSecondText = metricSeconds.toString()
    if (metricSeconds < 10) {
        metricSecondText = '0' + metricSecondText
    }
    if (metricMinutes < 10) {
        metricMinuteText = '0' + metricMinuteText
    }
    if (metricHours < 10) {
        metricHourText = '0' + metricHourText
    }
    let metricTime = metricHourText + ':' + metricMinuteText + ':' + metricSecondText
    let description = "Isn't it odd that we have 24 hours, 60 minutes, and 60 seconds? Personally I think it would be " +
        'far more logical if we had 100 hours, 100 minutes, and 100 seconds. The clock ' +
        'uses a simple conversion scheme: There are 86400/1000000=0.0864 seconds per metric second. So the total number of ' +
        'metric seconds passed this day is calculated, and from that the metric hour, minute and second is calculated. ' +
        'Time passes just as fast as it normally does, but with this measurement when the regular clock is 22:00, we still have ' +
        "roughly 9 metric hours left of the day. Isn't that great!"
    return (
        <div className='clock'>
            <DigitalClock time={metricTime} name={'Metric Clock'} description={description}/>
        </div>
    )
}

