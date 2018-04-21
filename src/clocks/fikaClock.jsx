import React from 'react'
import DigitalClock from '../templates/digitalClock.jsx'

export default class MetricClock extends React.Component {
  render () {
    const {currentMinute, currentHour} = this.props
    let time = "It's not fika"
    if ((currentHour === 10 && currentMinute <= 30) ||
      (currentHour === 9 && currentMinute >= 30) ||
      (currentHour === 14 && currentMinute >= 30) ||
      (currentHour === 15 && currentMinute <= 30)) {
      time = "It's fika!"
    }

    let description = 'Having grown up in Sweden, I reconginse the importance of a fika, roughly ' +
      'translated to: a cup of coffee or tea and a cake or pastry. This clock, thus, shows the most ' +
      'important time during the whole day, the time for fika. For those not initiated, this is around ' +
      "10 o'clock and around 15 o'clock."
    return (
      <div className='clock'>
        <DigitalClock time={time} name={'Fika Clock'} description={description} />
      </div>
    )
  }
}
