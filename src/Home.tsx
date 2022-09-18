import React from "react";
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
import {RomanClock} from "./clocks/romanClock";


export const HomeView = () => {
    const clockTypes: Record<string, React.FunctionComponent> = {
        RomanClock,
        RGBClock,
        PrimeClock,
        SpeedClock,
        ShuffleClock,
        HashClock,
        AbsoluteClock,
        HSLClock,
        BarClock,
        BrailleClock,
        FikaClock,
        MetricClock,
        PomodoroClock,
        ScrambledClock,
        WrongOrderClock,
        YearClock,
        CodeFoodClock,
        InflationClock,
        ColorClock
    };

    const clocksWithRow = Object.keys(clockTypes).map(clockKey => {
        return (
            <React.Fragment key={clockKey}>
                {clockTypes[clockKey]({})}
            </React.Fragment>
        );
    });


    return (
        <AllClocks>
            {clocksWithRow}
        </AllClocks>
    )
}

const AllClocks = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-auto-rows: 60vh;
  align-items: center;
  column-gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & > :nth-of-type(odd) {
      margin-top: 6rem;
    }
  }
`;

