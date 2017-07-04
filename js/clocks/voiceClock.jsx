import React from 'react'
import DigitalClock from '../templates/digitalClock.jsx'

export default class MetricClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {currentHour: this.props.currentHour, currentMinute: this.props.currentMinute, currentSecond: this.props.currentSecond}
  }
  componentWillReceiveProps(nextProps) {
    this.setState({currentHour: this.props.currentHour, currentMinute: this.props.currentMinute, currentSecond: this.props.currentSecond})
  }
  readTime = () => {
    let timeString = this.state.currentHour + ' ' + this.state.currentMinute + ', ' + this.state.currentSecond
    responsiveVoice.speak(timeString, 'UK English Male')
  }
  render () {
    let voiceTime = <button className='button' onClick={this.readTime} >
      <div className='voice-text'> What is the time? <i className='fa fa-commenting-o' aria-hidden='true' /> </div>
    </button>

    let description = `
      In order to help this website become somewhat more user friendly for people who are used
      to only asking for time and never reading a clock, this clock tells you the time. There
      is one major downside to this clock, and that is that it actually tells the time in a way
      that makes sense. Thankfully, it's quite annoying to have to click a button every time you
      want to know what the time is.
    `
    return (
      <div className='clock'>
        <DigitalClock time={voiceTime} name={'Voice Clock'} description={description} />
      </div>
    )
  }
}
