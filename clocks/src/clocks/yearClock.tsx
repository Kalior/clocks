import React, {useEffect, useRef, useState} from 'react'
import {useTime} from "../hooks/useTime";
import {getDayOfYear} from "date-fns";
import {ClockDescription, ClockName, ClockWrapper} from "../templates/clockTemplate";
import styled from "@emotion/styled";

export const YearClock = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const now = useTime(1000000)

    const days = getDayOfYear(now)

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

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        let drawing = new Image()
        drawing.src = 'year-clock.png'
        let r = (canvas.width / 2) - 5
        let degree = (-3.14 * 0.5) + (3.14 / 6) + ((days / 365) * 3.14 * 2)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#c8c8c8'
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.lineTo((canvas.width / 2) + (r * Math.cos(degree)), (canvas.height / 2) + (r * Math.sin(degree)))

        drawing.onload = function () {
            if (!ctx) {
                return
            }
            ctx.drawImage(drawing, 0, 0)
            ctx.stroke()
        }
    }, [days])


    const description = 'This clock is based upon the slow watch, but instead of showing a whole day it shows ' +
        'the entire year. Sadly, this clock manages to show the current month pretty accurately. Thankfully, it is ' +
        'virtually impossible to tell the time of day with this clock. Would actually ' +
        'be pretty cool to have a watch like this.'
    const name = 'Year Clock'
    const canvas = <YearCanvas ref={canvasRef} id='year-canvas-top' className='year-clock' height='200' width='200'/>

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

const YearCanvas = styled.canvas`
  border-radius: 2px;
  display: inline-block;
  background-color: #fff0;
  height: 5em;
`;