import React from 'react'
import DigitalClock from '../templates/digitalClock.jsx'
import _ from 'lodash'

export default class MetricClock extends React.Component {
  constructor (props) {
    super(props)
    let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59]
    this.state = {primeNumbers: primes}
  }
  render () {
    const {primeNumbers} = this.state
    const {currentSecond, currentMinute, currentHour} = this.props

    let secondText = _.includes(primeNumbers, currentSecond) ? currentSecond : ''
    let minuteText = _.includes(primeNumbers, currentMinute) ? currentMinute : ''
    let hourText = _.includes(primeNumbers, currentHour) ? currentHour : ''

    let metricTime = hourText + ':' + minuteText + ':' + secondText
    let description = 'As a student of Computer Science and Engineering, I have understood the importance of ' +
      'prime numbers in the world. So what this clock does, is it highlights the unsung use of prime numbers, namely ' +
      'in the clocks we view everyday. Simply put, the clock only displays the digit if it is prime, resulting ' +
      'in a clock that stands above all other clock in its beauty.'
    return (
      <div className='clock'>
        <DigitalClock time={metricTime} name={'Prime Clock'} description={description} />
      </div>
    )
  }
}
