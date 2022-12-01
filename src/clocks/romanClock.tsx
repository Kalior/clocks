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

    let description = `Roman numerals are by far the most convenient format for a clock. Carpe diem, ante meridiem, and post meridiem.`
    return <DigitalClock time={romanTime} name={'Roman Clock'} description={description}/>

};

const RomanDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export {}