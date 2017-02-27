import React from 'react';
import DigitalClock from '../templates/digitalClock.jsx'

export default class RandomClock extends React.Component {
  constructor(props) {
    super(props);
    this.randomTime = this.randomTime.bind(this);
    this.seededRandom = this.seededRandom.bind(this);
    this.state = {minuteStr: "", hourStr: "", currentHour: this.props.currentHour, currentMinute: this.props.currentMinute};
  }
  componentDidMount() {
    this.randomTime();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentMinute != this.state.currentMinute) {
      this.randomTime(nextProps.currentMinute, nextProps.currentHour);
    }
  }
  randomTime(currentMinute, currentHour) {
    currentMinute = currentMinute || this.state.currentMinute;
    currentHour = currentHour || this.state.currentHour;
    var hour = Math.floor(this.seededRandom(0, 23, currentMinute, currentHour));
    var minute = Math.floor(this.seededRandom(0, 59, currentMinute, currentHour));
    var nextHourStr = hour + "";
    if (hour < 10) {
      nextHourStr = "0" + nextHourStr;
    }
    var nextMinuteStr = minute + "";
    if (minute < 10) {
      nextMinuteStr = "0" + nextMinuteStr;
    }
    this.setState({minuteStr: nextMinuteStr, hourStr: nextHourStr, currentHour: currentHour, currentMinute: currentMinute})
  }
  seededRandom(max, min, minute, hour) {
    var seed = hour*100 + minute;
    var rand = require('random-seed').create(seed);
    return rand.intBetween(min, max);
  }
  render() {
    var seconds = this.props.currentSecond;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var randTime = this.state.hourStr + ":" + this.state.minuteStr + ":" + seconds;
    var description = "This is a clock that randomly takes a number and displays that as the time every minute. However, the random number generator "  +
      "bases it's seed upon the actual minute and hour, which basically can be interpreted as scrambling the time. For instance, every day when the " +
      "clock is 20:28, this clock displays 22:56. In theory, this would make it possible to learn how to tell time using this clock. But that would require " +
      "you to memorize the new values of the time for every minute of the day."
    // var description = "This is a clock that guesses at the time every minute. In fact, most of the time, this is a clock that does not tell time. Which would" +
    //   ", technically, mean that it is a clock that sometimes tells time, stochastically. Add prediction about how often it is correct..."
    return(
      <div className="random-clock clock">
        <DigitalClock time={randTime} name={"Random Clock"} description={description}/>
      </div>
    );
  }
}
