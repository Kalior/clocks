import React, {useEffect, useRef} from 'react'
import {useTime} from "../hooks/useTime";
import {getDayOfYear} from "date-fns";
import {ClockDescription, ClockName, Line, TextWrapper} from "../templates/clockTemplate";
import styled from "@emotion/styled";

export const YearClock = () => {
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
        drawing.src = 'year-clock-no-ring.png'
        let r = (canvas.width / 2) - 5
        let degree = (-3.14 * 0.5) + (3.14 / 6) + ((days / 365) * 3.14 * 2)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#213547'
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


    const description = 'This clock is based upon the "Slow watch", but instead of showing a whole day it shows ' +
        'the entire year. Unfortunately, this clock manages to show the current month pretty accurately. Thankfully, it is ' +
        'virtually impossible to tell the time of day.'
    const name = 'Year Clock'
    const canvas = <YearCanvas ref={canvasRef} id='year-canvas-top' height='200' width='200'/>

    return <>
        {canvas}
        <TextWrapper>
            <ClockName>
                {name}
            </ClockName>

            <ClockDescription>
                <Line/>
                {description}
            </ClockDescription>
        </TextWrapper>
    </>
}

const YearCanvas = styled.canvas`
  justify-self: end;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 39%;
  backdrop-filter: blur(2em);
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: #f7f7f724;

  display: inline-block;
  height: 8em;

  padding: 6px;
`;