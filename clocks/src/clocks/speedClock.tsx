import React, {useEffect, useRef, useState} from 'react'
import {useTime} from "../hooks/useTime";
import {getHours, getMilliseconds, getMinutes, getSeconds} from "date-fns";
import {ClockDescription, ClockName, ClockWrapper} from "../templates/clockTemplate";
import styled from "@emotion/styled";

export const SpeedClock = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const now = useTime(10)
    const currentSecond = getSeconds(now)
    const currentMinute = getMinutes(now)
    const currentHour = getHours(now)

    const [prevHourX, setPrevHourX] = useState(0)
    const [prevMinuteX, setPrevMinuteX] = useState(0)
    const [prevSecondX, setPrevSecondX] = useState(0)

    const canvasRef = useRef<HTMLCanvasElement | null>(null)


    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) {
            return
        }
        let ctx = canvas.getContext('2d')

        if (!ctx) {
            return
        }

        let objectHeight = canvas.height / 5
        let objectWidth = canvas.width / 15
        let objectMargin = (canvas.height - (objectHeight * 3)) / 2

        let hourSpeed = (currentHour / 10) + 0.1
        let minuteSpeed = (currentMinute / 10) + 0.1
        let secondSpeed = (currentSecond / 10) + 0.1
        let hourX = (hourSpeed + prevHourX) % (canvas.width + objectWidth)
        let minuteX = (minuteSpeed + prevMinuteX) % (canvas.width + objectWidth)
        let secondX = (secondSpeed + prevSecondX) % (canvas.width + objectWidth)

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#444'
        // Hour
        drawRoundRect(ctx, hourX - objectWidth, 0, objectWidth, objectHeight, 5, true, true)
        // Minute
        drawRoundRect(ctx, minuteX - objectWidth, objectHeight + objectMargin, objectWidth, objectHeight, 5, true, true)
        // Second
        drawRoundRect(ctx, secondX - objectWidth, (objectHeight + objectMargin) * 2, objectWidth, objectHeight, 5, true, true)

        setPrevHourX(hourX)
        setPrevMinuteX(minuteX)
        setPrevSecondX(secondX)
    }, [now])


    const drawRoundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, fill: boolean, stroke: boolean) => {
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + width - radius, y)
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
        ctx.lineTo(x + width, y + height - radius)
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
        ctx.lineTo(x + radius, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.closePath()
        if (fill) {
            ctx.fill()
        }
        if (stroke) {
            ctx.stroke()
        }
    }
    const description = 'This clock is similar to the Bar Clock in that it interprets the digit ' +
        'at each position of the clock. It does, however, use these digits in a different fashion. ' +
        'What it does is it moves the object corresponding to the digit number of pixels (times a constant factor) ' +
        'forward. So, if the object furthest down moves slowly, ' +
        'the number of seconds this minute is still low. And if that object stops, a minute ' +
        'has gone by and the object above it starts moving faster. Appreciating subtle speed ' +
        'differences is the key to being able to interpret this clock.'
    const name = 'Speed Clock'

    const [height, setHeight] = useState(0)

    const canvas = <SpeedCanvas ref={canvasRef} id='speed-canvas' className='speed-clock' height='200' width='900'/>

    return (
        <ClockWrapper
            isExpanded={isExpanded}
            tabIndex={0}
            onClick={() => setIsExpanded(!isExpanded)}
            onBlur={() => setIsExpanded(false)}
        >
            <ClockName className='clock-name clock-attribute'>
                {name}
            </ClockName>
            <div className='clock-attribute speed-clock-attribute'>
                {canvas}
            </div>
            <ClockDescription isExpanded={isExpanded}>
                <hr/>
                {description}
            </ClockDescription>
        </ClockWrapper>
    )
}

const SpeedCanvas = styled.canvas`
  width: 100%;
  border-radius: 2px;
  display: inline-block;
  background-color: #fff0;
  height: 5em;
`;
