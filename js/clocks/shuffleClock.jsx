import React from 'react';
import _ from 'lodash';
import RandomSeed from 'random-seed';

import DigitalClock from '../templates/digitalClock.jsx'

export default class ShuffleClock extends React.Component {
  constructor(props) {
    super(props);
    let rand = RandomSeed.create(this.props.randomPageloadSeed);
    this.state = {
      order: [0,1,2,3,4,5].sort(() => { return 0.5 - rand.floatBetween(0, 1) })
    }
  }

  render() {
    let {currentHour, currentMinute, currentSecond} = this.props;
    let arrayTime = [];
    let appendToArrayTime = (time) => {
      if (time < 10) {
        arrayTime.push(0);
        arrayTime.push(time);
      } else {
        arrayTime.push(Math.floor(time / 10));
        arrayTime.push(time % 10);
      }
    }

    appendToArrayTime(currentHour);
    appendToArrayTime(currentMinute);
    appendToArrayTime(currentSecond);

    let scrambledClock = _.chain(this.state.order)
                          .zip(arrayTime)
                          .sortBy(tuple => tuple[0])
                          .map(tuple => tuple[1])
                          .value();

    scrambledClock.splice(4, 0, ':')
    scrambledClock.splice(2, 0, ':')
    var randTime = String(scrambledClock.join(''))
    var description = `
    This clock shuffles the positions of the numbers.
    It is actually possible to read the time from this one.
    The seconds reveals themselves almost at once. The position for the first minute number is also tolerable to wait for.
    After this, however, things gets tedious.
    You might be able to exclude some digits from some positions, i.e. the position representing tenths of hours cannot go above '2'.
    `;
    return(
      <div className="random-clock clock">
        <DigitalClock time={randTime} name={"Shuffle clock"} description={description}/>
      </div>
    );
  }
}
