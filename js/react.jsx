import React from 'react';
import {render} from 'react-dom';
import RandomClock from './clocks/randomClock.jsx';
import ColorClock from './clocks/colorClock.jsx';
import WrongOrderClock from './clocks/wrongOrder.jsx';
import HSLClock from './clocks/hslClock.jsx';
import BarClock from './clocks/barClock.jsx';
import MetricClock from './clocks/metricClock.jsx';
var moment = require('moment');

class MainView extends React.Component {
  constructor(props) {
    super(props);
    var currentHour = parseInt(moment().format('HH'));
    var currentMinute = parseInt(moment().format('mm'));
    var second = parseInt(moment().format('ss'));
    var millisecond = parseInt(moment().format('SSS'));

    var clockTypes = [
      RandomClock, ColorClock, BarClock, WrongOrderClock, HSLClock, MetricClock
    ];

    this.state = {currentHour: currentHour, currentMinute: currentMinute, currentSecond: second, currentMillisecond: millisecond,
      timer: null, topClockIndex: 0, clockTypes: clockTypes};

    this.countTime = this.countTime.bind(this);
    this.updateTopClockIndex = this.updateTopClockIndex.bind(this);
  }
  countTime() {
    var nextMillisecond = this.state.currentMillisecond + 10;
    var nextSeconds = this.state.currentSecond;
    var nextMinute = this.state.currentMinute;
    var nextHour = this.state.currentHour;
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
    this.setState({currentSecond: nextSeconds, currentMinute: nextMinute, currentHour: nextHour, currentMillisecond: nextMillisecond});
  }
  componentDidMount() {
    var seed = this.state.currentMinute;
    var rand = require('random-seed').create(seed);
    var index = rand.intBetween(0, this.state.clockTypes.length-1);
    this.setState({timer: setInterval(this.countTime, 10), topClockIndex: index});
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  updateTopClockIndex(i) {
    this.setState({topClockIndex: i});
  }
  render() {
    var clocksWithRow = [];
    var numberOfClocks = this.state.clockTypes.length - 1;
    for (var i = 0; i < numberOfClocks; i++) {
      clocksWithRow.push(
        <div className="large-3 small-6 columns click-clock" key={i} onClick={this.updateTopClockIndex.bind(this, i)}>
          {React.createElement(this.state.clockTypes[i], {currentHour: this.state.currentHour, currentMinute: this.state.currentMinute,
            currentSecond: this.state.currentSecond, currentMillisecond: this.state.currentMillisecond})}
        </div>
      );
    }
    // Extra for the last item as we want an added class on that one.
    clocksWithRow.push(
        <div className="large-3 small-6 columns end click-clock" key={numberOfClocks} onClick={this.updateTopClockIndex.bind(this, numberOfClocks)}>
          {React.createElement(this.state.clockTypes[i], {currentHour: this.state.currentHour, currentMinute: this.state.currentMinute,
            currentSecond: this.state.currentSecond, currentMillisecond: this.state.currentMillisecond})}
        </div>
      );
    return (
      <div className="main-view row" id="content">
        <div className="top-clock row">
          <div className="large-offset-1 large-10 columns">
            {React.createElement(this.state.clockTypes[this.state.topClockIndex], {currentHour: this.state.currentHour, currentMinute: this.state.currentMinute,
              currentSecond: this.state.currentSecond, currentMillisecond: this.state.currentMillisecond})}
          </div>
        </div>
        <div className="all-clocks row">
          {clocksWithRow}
        </div>
      </div>
    );
  }
}

render(
  <MainView/>,
  document.getElementById('react-clocks')
);
