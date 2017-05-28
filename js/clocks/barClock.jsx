import React from 'react'

export default class BarClock extends React.Component {
  render () {
    var timeSum = this.props.currentHour + this.props.currentMinute + this.props.currentSecond
    var hourPercentage = this.props.currentHour / timeSum * 100
    var minutePercentage = this.props.currentMinute / timeSum * 100
    var secondPercentage = this.props.currentSecond / timeSum * 100

    var hourDiv = <div className='bar-clock' style={{width: hourPercentage + '%', backgroundColor: '#777'}} />
    var minuteDiv = <div className='bar-clock' style={{width: minutePercentage + '%', backgroundColor: '#444'}} />
    var secondDiv = <div className='bar-clock' style={{width: secondPercentage + '%', backgroundColor: '#777'}} />

    var description = "If you've ever wondered how a clock that displayed time as three bars, one for each digit in a digital clock" +
      ", where each bar corresponds to that number's fraction of the total sum of the digits, would look like, here it is. " +
      'Some hints for reading this clock: when the hour bar (the first one, no flipping here) is large, that probably means that ' +
      'it is still early in the hour. If the hour bar stays relatively small all the time, it is either an early hour, or there ' +
      'have been more than 30 minutes since the hour last struck.'
    var name = 'Bar Clock'
    return (
      <div className='clock-wrapper'>
        <div className='clock-name clock-attribute'>
          {name}
        </div>
        <div className='bar-clock-attribute'>
          {hourDiv}{minuteDiv}{secondDiv}
        </div>
        <div className='clock-description clock-attribute'>
          <hr />
          {description}
        </div>
      </div>
    )
  }
}
