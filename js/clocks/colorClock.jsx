import React from 'react'
import ColorClockTemplate from '../templates/colorClockTemplate.jsx'

export default class ColorClock extends React.Component {
  render () {
    let red = Math.floor(this.props.currentHour / 23 * 255)
    let green = Math.floor(this.props.currentMinute / 59 * 255)
    let blue = Math.floor(this.props.currentSecond / 59 * 255)
    let color = 'rgb(' + red + ',' + green + ',' + blue + ')'

    let clockStyle = {
      background: color,
      background: 'radial-gradient(circle, ' + color + '40%, rgba(255,255,255,0) 60%)'
    }

    let description = 'This clock displays the current time as an RGB value where red is the hour, green is the minute and blue is the second. ' +
      'So, in order to read this clock you will have to be fluent in RGB, and be able to appreciate subtle color differences.'
    let name = 'RGB Clock'
    return (
      <ColorClockTemplate name={name} description={description} clockStyle={clockStyle} />
    )
  }
}
