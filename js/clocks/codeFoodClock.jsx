import React from "react";
import DigitalClock from "../templates/digitalClock.jsx";
import _ from "lodash";

export default class CodeFoodClock extends React.Component {
  withinRange = (currentHour, currentMinute, targetHour) => {
    return (
      (currentHour === targetHour && currentMinute <= 15) ||
      (currentHour === targetHour - 1 && currentMinute >= 45)
    );
  };

  render() {
    const { currentMinute, currentHour } = this.props;
    let time = "Code";
    if (
      _.some([8, 12, 16, 20], t =>
        this.withinRange(currentHour, currentMinute, t)
      )
    ) {
      time = "Food";
    }

    let description = `Inspired by Skalman's clock (from Bamse, a Swedish cartoon),
      tells him when to eat and when to sleep.  This clock works similarly, but
      instead of being targeted towards a tortoise capable of inventing almost
      anything, it equally capable programmers.  Basically, as a programmer,
      you only need to know two when to code and when to eat, and this clock
      tells you exactly that.`;

    return (
      <div className="clock">
        <DigitalClock
          time={time}
          name={"CodeFood Clock"}
          description={description}
        />
      </div>
    );
  }
}
