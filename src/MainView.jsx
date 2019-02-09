import React from "react";
import IdleTimer from "react-idle-timer";
import RandomSeed from "random-seed";
import Elevator from "elevator.js";

import {
  ScrambleClock,
  ColorClock,
  WrongOrderClock,
  HSLClock,
  BarClock,
  MetricClock,
  LocationClock,
  SpeedClock,
  RomanClock,
  ShuffleClock,
  YearClock,
  PrimeClock,
  FikaClock,
  BrailleClock,
  VoiceClock,
  MapClock,
  PomodoroClock,
  CodeFoodClock,
  HashClock,
  AbsoluteClock
} from "./clocks";

var moment = require("moment");

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    let currentHour = parseInt(moment().format("HH"), 10);
    let currentMinute = parseInt(moment().format("mm"), 10);
    let second = parseInt(moment().format("ss"), 10);
    let millisecond = parseInt(moment().format("SSS"), 10);

    let rand = RandomSeed.create(millisecond);

    let clockTypes = {
      ScrambleClock,
      ColorClock,
      BarClock,
      WrongOrderClock,
      HSLClock,
      MetricClock,
      LocationClock,
      SpeedClock,
      ShuffleClock,
      RomanClock,
      BrailleClock,
      YearClock,
      PrimeClock,
      FikaClock,
      VoiceClock,
      MapClock,
      PomodoroClock,
      CodeFoodClock,
      HashClock,
      AbsoluteClock
    };

    this.state = {
      currentHour: currentHour,
      currentMinute: currentMinute,
      currentSecond: second,
      currentMillisecond: millisecond,
      timer: null,
      topClockKey: 'BrailleClock',
      clockTypes: clockTypes,
      randomPageloadSeed: rand.random(),
      idle: false,
      timeout: 50000,
      elevator: null
    };
  }
  countTime = () => {
    let nextMillisecond = this.state.currentMillisecond + 10; // count 10 milliseconds each update
    let nextSeconds = this.state.currentSecond;
    let nextMinute = this.state.currentMinute;
    let nextHour = this.state.currentHour;
    if (nextMillisecond >= 1000) {
      nextMillisecond = nextMillisecond % 1000;
      nextSeconds++;
      if (nextSeconds >= 60) {
        nextSeconds = 0;
        nextMinute++;
        if (nextMinute >= 60) {
          nextMinute = 0;
          nextHour++;
          if (nextHour >= 24) {
            nextHour = 0;
          }
        }
      }
    }
    this.setState({
      currentSecond: nextSeconds,
      currentMinute: nextMinute,
      currentHour: nextHour,
      currentMillisecond: nextMillisecond
    });
  };
  componentDidMount() {
    let seed = this.state.currentMinute;
    let rand = require("random-seed").create(seed);
    let index = rand.intBetween(0, Object.keys(this.state.clockTypes).length - 1);
    const topClockKey = Object.keys(this.state.clockTypes)[index]
    console.log(topClockKey)

    let elevator = new Elevator({
      targetElement: document.querySelector("#top-clock"),
      duration: 1000,
      verticalPadding: 10
    });
    this.setState({
      timer: setInterval(this.countTime, 10),
      topClockKey: topClockKey,
      elevator: elevator
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  updateTopClockKey = newTopClockKey => {
    if (this.state.elevator != null) {
      this.state.elevator.elevate();
    }
    this.props.history.push('/' + newTopClockKey)
    this.setState({ topClockKey: newTopClockKey });
  };

  onActive = () => {
    if (this.state.idle) {
      let currentHour = parseInt(moment().format("HH"), 10);
      let currentMinute = parseInt(moment().format("mm"), 10);
      let second = parseInt(moment().format("ss"), 10);
      let millisecond = parseInt(moment().format("SSS"), 10);

      this.setState({
        currentHour: currentHour,
        currentMinute: currentMinute,
        currentSecond: second,
        currentMillisecond: millisecond,
        idle: false
      });
    }
  };
  onIdle = () => {
    if (!this.state.idle) {
      this.setState({ idle: true });
    }
  };
  render() {
    const {
      match: { params: { clockId } }
    } = this.props;

    const {
      clockTypes,
      currentHour,
      currentMinute,
      currentSecond,
      currentMillisecond,
      randomPageloadSeed,
      topClockKey,
      timeout
    } = this.state;

    const clocksWithRow = Object.keys(clockTypes).map(clockKey => {
      return (
        <div
          className="click-clock"
          key={clockKey}
          onClick={this.updateTopClockKey.bind(this, clockKey)}
        >
          {React.createElement(clockTypes[clockKey], {
            currentHour: currentHour,
            currentMinute: currentMinute,
            currentSecond: currentSecond,
            currentMillisecond: currentMillisecond,
            isTop: false,
            randomPageloadSeed: randomPageloadSeed
          })}
        </div>
      );
    });

    const clockKey = Object.keys(clockTypes).find(k => k === clockId);

    const topClockToRender = clockKey || topClockKey;

    return (
      <IdleTimer
        activeAction={this.onActive}
        idleAction={this.onIdle}
        timeout={timeout}
      >
        <div className="main-view" id="content">
          <div id="top-clock" className="top-clock">
            {React.createElement(clockTypes[topClockToRender], {
              currentHour: currentHour,
              currentMinute: currentMinute,
              currentSecond: currentSecond,
              currentMillisecond: currentMillisecond,
              isTop: true,
              randomPageloadSeed: randomPageloadSeed
            })}
          </div>

          <div className="all-clocks">
            {clocksWithRow}
          </div>
        </div>
      </IdleTimer>
    );
  }
}
