import React, {useState} from 'react'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";
import {ClockDescription, ClockName, ClockWrapper} from "../templates/clockTemplate";
import styled from "@emotion/styled";

export const BarClock = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const now = useTime(1000)
    let timeSum = getHours(now) + getMinutes(now) + getSeconds(now)
    let hourPercentage = getHours(now) / timeSum * 100
    let minutePercentage = getMinutes(now) / timeSum * 100
    let secondPercentage = getSeconds(now) / timeSum * 100

    let hourDiv = <BarElement style={{width: hourPercentage + '%', backgroundColor: '#777'}}/>
    let minuteDiv = <BarElement style={{width: minutePercentage + '%', backgroundColor: '#444'}}/>
    let secondDiv = <BarElement style={{width: secondPercentage + '%', backgroundColor: '#777'}}/>

    let description = "If you've ever wondered how a clock that displayed time as three bars, one for each digit in a digital clock" +
        ", where each bar corresponds to that number's fraction of the total sum of the digits, would look like, here it is. " +
        'Some hints for reading this clock: when the hour bar (the first one, no flipping here) is large, that probably means that ' +
        'it is still early in the hour. If the hour bar stays relatively small all the time, it is either an early hour, or there ' +
        'have been more than 30 minutes since the hour last struck.'
    let name = 'Bar Clock'
    return (
        <ClockWrapper
            isExpanded={isExpanded}
            tabIndex={0}
            onClick={() => setIsExpanded(!isExpanded)}
            onBlur={() => setIsExpanded(false)}
        >
            <ClockName>
                {name}
            </ClockName>
            <div >
                {hourDiv}{minuteDiv}{secondDiv}
            </div>
            <ClockDescription isExpanded={isExpanded} >
                <hr/>
                {description}
            </ClockDescription>
        </ClockWrapper>
    )
};

const BarElement = styled.div`
  border-radius: 2px;
  box-shadow: inset 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
  display: inline-block;
  background-color: #fff;
  height: 4em;
`;