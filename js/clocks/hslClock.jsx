import React from 'react';
import ColorClockTemplate from '../templates/colorClockTemplate.jsx'

export default class HSLClock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var hue = Math.floor(this.props.currentHour / 23 * 360);
    var sat = this.props.currentMinute + 20;
    var light = this.props.currentSecond + 20;
    var color = "hsl(" + hue +"," + sat +"%," + light +"%)";

    var clockStyle = {
      background: color,
      background: "radial-gradient(circle, " + color + "40%, rgba(255,255,255,0) 60%)"
    };

    var description = "This clock displays the current time as an HSL value in a simliar fashion to the RGB Clock. " +
      "However, in an attempt to make this a more reasonable clock, the saturation and lightness percentage is in the range [20,79]."
      "I do find, however, that this clock is easier to read than the RGB one, mainly beacuse every hour, the hue is the same while only the lightness " +
      " and saturation is differing with minute and second."
    var name = "HSL Clock";
    return(
      <ColorClockTemplate name={name} description={description} clockStyle={clockStyle}/>
    );
  }
}
