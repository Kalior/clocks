import React from 'react'
import ColorClockTemplate from '../templates/colorClockTemplate.jsx'

export default class ColorClock extends React.Component {
  render () {
    var red = Math.floor(this.props.currentHour / 23 * 255)
    var green = Math.floor(this.props.currentMinute / 59 * 255)
    var blue = Math.floor(this.props.currentSecond / 59 * 255)
    var color = 'rgb(' + red + ',' + green + ',' + blue + ')'

    var clockStyle = {
      background: color,
      background: 'radial-gradient(circle, ' + color + '40%, rgba(255,255,255,0) 60%)'
    }

    var description = 'This clock displays the current time as an RGB value where red is the hour, green is the minute and blue is the second. ' +
      'So, in order to read this clock you will have to be fluent in RGB, and be able to appreciate subtle color differences.'
    var name = 'RGB Clock'
    return (
      <ColorClockTemplate name={name} description={description} clockStyle={clockStyle} />
    )
  }
}
