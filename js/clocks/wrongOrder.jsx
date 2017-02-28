import React from 'react';
import DigitalClock from '../templates/digitalClock.jsx'

export default class WrongOrderClock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var seconds = this.props.currentSecond;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var minutes = this.props.currentMinute;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var hours = this.props.currentHour;
    if (hours < 10) {
      hours = "0" + hours;
    }
    var randTime = minutes + ":" +  seconds + ":" + hours;
    var description = "This clock simply displays the hour, minute and seconds in the wrong order. Really confusing to look at..."
    return(
      <div className="random-clock clock">
        <DigitalClock time={randTime} name={"Flipped Clock"} description={description}/>
      </div>
    );
  }
}
