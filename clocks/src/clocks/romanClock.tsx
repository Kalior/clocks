import React from 'react'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";
import styled from "@emotion/styled";

let romanNumeralConverter = require('roman-numeral-converter-mmxvi')

export const RomanClock = () => {
    const now = useTime(1000)

    const romanHours = romanNumeralConverter.getRomanFromInteger(getHours(now))
    const romanMinutes = romanNumeralConverter.getRomanFromInteger(getMinutes(now))
    const romanSeconds = romanNumeralConverter.getRomanFromInteger(getSeconds(now))

    let romanTime = romanHours + ':' + romanMinutes + ':' + romanSeconds

    let description = `Since everyone knows how to read roman numerals, this clock displays the current time
       in those. A quick refresher for those who don't remember the corresponding numbers: L=50, X=10, V=5, I=1.
       The numbers can be combined by adding a smaller number before a larger number, which corresponds to minus
       (XL = 50 - 10 = 40), or as a smaller number after a larger number, which means plus (LX = 50 + 10 = 60).
       Note that the romans didn't have the number 0, so when the clock is 0, that position is empty.`
    //let romanTimeElement = <div id='roman-time'></div>
    return (
        <RomanDiv>
            <DigitalClock time={romanTime} name={'Roman Clock'} description={description}/>
        </RomanDiv>
    )
};

const RomanDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;