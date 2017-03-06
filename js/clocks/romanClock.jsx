import React from 'react'
import DigitalClock from '../templates/digitalClock.jsx'

let romanNumeralConverter = require('roman-numeral-converter-mmxvi')

export default class RomanClock extends React.Component {
  render () {
    let romanHours = romanNumeralConverter.getRomanFromInteger(this.props.currentHour)
    let romanMinutes = romanNumeralConverter.getRomanFromInteger(this.props.currentMinute)
    let romanSeconds = romanNumeralConverter.getRomanFromInteger(this.props.currentSecond)

    let romanTime = romanHours + ':' + romanMinutes + ':' + romanSeconds

    let description = 'Since everyone knows how to read roman numerals, this clock displays the current time ' +
      "in those. A quick refresher for those who don't remember the corresponding numbers: L=50, X=10, V=5, I=1. " +
      'The numbers can be combined by adding a smaller number before a larger number, which means minus (XL = 40), or ' +
      "as a smaller number after a larger number, which means plus (LX = 60). Note that the romans didn't have the " +
      'number 0, so when the clock is 0, that position is empty'
    let romanTimeElement = <div id='roman-time'>{romanTime}</div>
    return (
      <div className='clock'>
        <DigitalClock time={romanTimeElement} name={'Roman Clock'} description={description} />
      </div>
    )
  }
}
