import React, {useState} from "react";
import IdleTimer from "react-idle-timer";
import Scroll from "react-scroll"
import {compareAsc, format, getHours, getMilliseconds, getMinutes, getSeconds} from 'date-fns'
import {useNavigate, useParams} from "react-router-dom";

let scroll = Scroll.animateScroll;
import styled from "@emotion/styled";

import {HSLClock} from "./clocks/hslClock";
import {RGBClock} from "./clocks/rgbClock";
import {AbsoluteClock} from "./clocks/absoluteClock";
import {BarClock} from "./clocks/barClock";
import {BrailleClock} from "./clocks/brailleClock";
import {FikaClock} from "./clocks/fikaClock";
import {HashClock} from "./clocks/hashClock";
import {MetricClock} from "./clocks/metricClock";
import {PomodoroClock} from "./clocks/pomodoroClock";
import {PrimeClock} from "./clocks/primeClock";
import {ScrambledClock} from "./clocks/scrambledClock";
import {ShuffleClock} from "./clocks/shuffleClock";
import {SpeedClock} from "./clocks/speedClock";
import {WrongOrderClock} from "./clocks/wrongOrder";
import {YearClock} from "./clocks/yearClock";
import {CodeFoodClock} from "./clocks/codeFoodClock";
import {InflationClock} from "./clocks/InflationClock";
import {ColorClock} from "./clocks/ColorClock";


export const HomeView = () => {
    let navigate = useNavigate();

    const clockTypes: Record<string, React.FunctionComponent> = {
        AbsoluteClock,
        HSLClock,
        BarClock,
        BrailleClock,
        FikaClock,
        HashClock,
        MetricClock,
        PomodoroClock,
        PrimeClock,
        RGBClock,
        ScrambledClock,
        ShuffleClock,
        SpeedClock,
        WrongOrderClock,
        YearClock,
        CodeFoodClock,
        InflationClock,
        ColorClock
    };
    const {clockId} = useParams()

    const [topClock, setTopClock] = useState(clockId || "HSLClock");


    const updateTopClockKey = (newTopClock: string) => {
        scroll.scrollToTop();
        navigate('/' + newTopClock, {replace: true})

        setTopClock(newTopClock)
    };


    const clocksWithRow = Object.keys(clockTypes).map(clockKey => {
        return (
            <div
                className="click-clock"
                key={clockKey}
                onClick={() => updateTopClockKey(clockKey)}
            >
                <>
                    {clockTypes[clockKey]({})}
                </>
            </div>
        );
    });


    return (

        <div className="main-view" id="content">

            <AllClocks>
                {clocksWithRow}
            </AllClocks>
        </div>
    )
}

const AllClocks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

