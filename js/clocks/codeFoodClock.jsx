import React from "react";
import Notification from "react-web-notification";
import DigitalClock from "../templates/digitalClock.jsx";
import _ from "lodash";

export default class CodeFoodClock extends React.Component {
  constructor(props) {
    super(props);

    const { currentHour, currentMinute, currentSecond } = props;
    const options = {
      tag: currentHour + ":" + currentSecond + ":" + currentSecond,
      lang: 'en'
    }

    const time = this.checkTime(props);
    this.state = {
      time: time,
      ignore: true,
      options: options
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.currentMinute != this.props.currentMinute) {
      const { oldTime } = this.state;
      let { ignore, options } = this.state;
      const { currentHour, currentMinute, currentSecond } = newProps;

      const newTime = this.checkTime(newProps);

      if (oldTime !== newTime) {
        ignore = false;
        options = {
          tag: currentHour + ":" + currentSecond + ":" + currentSecond,
          lang: 'en'
        }
      } else {
        ignore = true;
      }
      this.setState({time: newTime, ignore: ignore, options: options})
    }
  }

  checkTime = (props) => {
    const { currentSecond, currentMinute, currentHour } = props;

    let time = "Code";
    if (
      _.some([8, 12, 16, 20], t =>
        this.withinRange(currentHour, currentMinute, t)
      )
    ) {
      time = "Food";
    }
    return time
  }

  withinRange = (currentHour, currentMinute, targetHour) => {
    return (
      (currentHour === targetHour && currentMinute <= 15) ||
      (currentHour === targetHour - 1 && currentMinute >= 45)
    );
  };

  render() {
    const { isTop } = this.props;
    const { time, ignore, options } = this.state;
    let description = `Inspired by Skalman's clock (from Bamse, a Swedish cartoon),
      tells him when to eat and when to sleep.  This clock works similarly, but
      instead of being targeted towards a tortoise capable of inventing almost
      anything, it equally capable programmers.  Basically, as a programmer,
      you only need to know two when to code and when to eat, and this clock
      tells you exactly that.`;

    let notification = <Notification
        ignore={ignore && !isTop}
        timeout={5000}
        title={time}
        askAgain={false}
        options={options}
      />

    return (
      <div className="clock">
        <DigitalClock
          time={time}
          name={"CodeFood Clock"}
          description={description}
        />
        {notification}
      </div>
    );
  }
}
