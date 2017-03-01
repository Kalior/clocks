import React from 'react';
import {render} from 'react-dom';
import RandomClock from './clocks/randomClock.jsx';
import ColorClock from './clocks/colorClock.jsx';
import WrongOrderClock from './clocks/wrongOrder.jsx';
import HSLClock from './clocks/hslClock.jsx';
import BarClock from './clocks/barClock.jsx';
var moment = require('moment');

class MainView extends React.Component {
  constructor(props) {
    super(props);
    var currentHour = parseInt(moment().format('HH'));
    var currentMinute = parseInt(moment().format('mm'));
    var second = parseInt(moment().format('ss'));

    var clockTypes = [
      RandomClock, ColorClock, WrongOrderClock, HSLClock, BarClock
    ];

    this.state = {currentHour: currentHour, currentMinute: currentMinute, currentSecond: second, timer: null,
      topClockIndex: 0, clockTypes: clockTypes};

    this.countTime = this.countTime.bind(this);
    this.updateTopClockIndex = this.updateTopClockIndex.bind(this);
  }
  countTime() {
    var nextSeconds = this.state.currentSecond + 1;
    var nextMinute = this.state.currentMinute;
    var nextHour = this.state.currentHour;
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
    this.setState({currentSecond: nextSeconds, currentMinute: nextMinute, currentHour: nextHour});
  }
  componentDidMount() {
    var seed = this.state.currentMinute;
    var rand = require('random-seed').create(seed);
    var index = rand.intBetween(0, this.state.clockTypes.length-1);
    this.setState({timer: setInterval(this.countTime, 100), topClockIndex: index});
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  updateTopClockIndex(i) {
    this.setState({topClockIndex: i});
  }
  render() {
    var clocksWithRow = [];
    for (var i = 0; i < this.state.clockTypes.length; i++) {
      clocksWithRow.push(
        <div className="large-3 columns click-clock" key={i} onClick={this.updateTopClockIndex.bind(this, i)}>
          {React.createElement(this.state.clockTypes[i], {currentHour: this.state.currentHour, currentMinute: this.state.currentMinute,
            currentSecond: this.state.currentSecond})}
        </div>
      );
    }
    return (
      <div className="main-view row" id="content">
        <div className="top-clock row">
          <div className="large-offset-1 large-10 columns">
            {React.createElement(this.state.clockTypes[this.state.topClockIndex], {currentHour: this.state.currentHour, currentMinute: this.state.currentMinute,
              currentSecond: this.state.currentSecond})}
          </div>
        </div>
        <div className="all-clocks row">
          {clocksWithRow}
          <div className="large-3 columns">
          </div>
        </div>
      </div>
    );
  }
}

render(
  <MainView/>,
  document.getElementById('react-clocks')
);
