import React from 'react'
import {useTime} from "../hooks/useTime";
import {getHours, getMinutes, getSeconds} from "date-fns";
import {DigitalClock} from "../templates/digitalClock";
import styled from "@emotion/styled";


export const RomanClock = () => {

    const romanFormatter = new Intl.NumberFormat('en-Latn-US-u-nu-roman', )
    const convertToRoman = (num: number) => {
        interface StringNumberMap {
            [key: string]: number;
        }
        const roman: StringNumberMap = {
            "C": 100,
            "XC": 90,
            "L": 50,
            "XL": 40,
            "X": 10,
            "IX": 9,
            "V": 5,
            "IV": 4,
            "I": 1
        };
        let romanStr = '';

        for (let i of Object.keys(roman)) {
            let q = Math.floor(num / roman[i]);
            num -= q * roman[i];
            romanStr += i.repeat(q);
        }
        return romanStr;
    };

    const now = useTime(1000)

    const romanHours = convertToRoman(getHours(now))
    const romanMinutes = convertToRoman(getMinutes(now))
    const romanSeconds = convertToRoman(getSeconds(now))

    let romanTime = <RomanDiv>{romanHours + ':' + romanMinutes + ':' + romanSeconds}</RomanDiv>

    let description = `Since everyone knows how to read roman numerals, this clock displays the current time
       in those. A quick refresher for those who don't remember the corresponding numbers: L=50, X=10, V=5, I=1.
       The numbers can be combined by adding a smaller number before a larger number, which corresponds to minus
       (XL = 50 - 10 = 40), or as a smaller number after a larger number, which means plus (LX = 50 + 10 = 60).
       Note that the romans didn't have the number 0, so when the clock is 0, that position is empty.`
    return <DigitalClock time={romanTime} name={'Roman Clock'} description={description}/>

};

const RomanDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export {}