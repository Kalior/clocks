import React from "react";
import DigitalClock from "../templates/digitalClock.jsx";
import _ from "lodash";

export default class CodeFoodClock extends React.Component {
  constructor(props) {
    super(props);

    const time = this.checkTime(props);
    this.state = {
      time: time
    }
  }

  componentDidMount() {
    Notification.requestPermission();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.currentMinute !== this.props.currentMinute) {
      const { time } = this.state;
      const { isTop } = newProps;

      const newTime = this.checkTime(newProps);

      if (time !== newTime && !isTop) {
        this.sendNotification(newTime);
      }

      this.setState({time: newTime})
    }
  }

  sendNotification = (time) => {
    // From https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      return
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(time);
      setTimeout(notification.close.bind(notification), 5000);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(time);
          setTimeout(notification.close.bind(notification), 5000);

        }
      });
    }
    // Finally, if the user has denied notifications and you
    // want to be respectful there is no need to bother them any more.
  }

  checkTime = (props) => {
    const { currentMinute, currentHour } = props;

    let time = "Code";
    if (
      _.some([8, 12, 19, 20], t =>
        this.withinRange(currentHour, currentMinute, t)
      )
    ) {
      time = "Food";
    }
    return time
  }

  withinRange = (currentHour, currentMinute, targetHour) => {
    return (
      (currentHour === targetHour && currentMinute <= 21) ||
      (currentHour === targetHour - 1 && currentMinute >= 45)
    );
  };

  render() {
    const { time } = this.state;
    let description = `Inspired by Skalman's clock (from Bamse, a Swedish cartoon),
      which tells him when to eat and when to sleep.  This clock works similarly, but
      instead of being targeted towards a tortoise capable of inventing almost
      anything, it targets equally capable programmers.  Basically, as a programmer,
      you only need to know two things: when to code and when to eat.  This clock
      tells you exactly that. Also gives a friendly notification, so you don't miss
      either event.`;

    return (
      <div className="clock">
        <DigitalClock
          time={time}
          name={"Code/Food Clock"}
          description={description}
        />
      </div>
    );
  }
}
