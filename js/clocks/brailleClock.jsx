import React from 'react'
import Braille from 'braille'
import DigitalClock from '../templates/digitalClock.jsx'

export default class BrailleClock extends React.Component {
  render () {
    let hourBraille = Braille.toBraille(this.props.currentHour.toString())
    let minuteBraille = Braille.toBraille(this.props.currentMinute.toString())
    let secondBraille = Braille.toBraille(this.props.currentSecond.toString())
    let zeroBraille = Braille.toBraille('0')
    let hourBrailleTime = this.props.currentHour < 10 ? zeroBraille + hourBraille : hourBraille
    let minuteBrailleTime = this.props.currentMinute < 10 ? zeroBraille + minuteBraille : minuteBraille
    let secondBrailleTime = this.props.currentSecond < 10 ? zeroBraille + secondBraille : secondBraille
    let time = hourBrailleTime + ':' + minuteBrailleTime + ':' + secondBrailleTime

    let description = `In order to highlight one of the more common uncommon writing systems, this clock
      displays time using braille in six dot notation. So even though this clock actually displays time
      it does so in a way that most people can't read. I wouldn't be surprised if fewer people can read this
      clock than the Roman clock. If you can read this one, good on you!
      Also, isn't it ironic to display braille on a flat screen?`
    return (
      <DigitalClock time={time} name={'Braille Clock'} description={description} />
    )
  }
}
