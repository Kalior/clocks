import React from 'react';
import {render} from 'react-dom';
import RandomClock from './clocks/randomClock.jsx'
var moment = require('moment');

class MainView extends React.Component {
  constructor(props) {
    super(props);
    var currentHour = parseInt(moment().format('HH'));
    var currentMinute = parseInt(moment().format('mm'));
    var second = parseInt(moment().format('ss'));
    this.state = {currentHour: currentHour, currentMinute: currentMinute, currentSecond: second, timer: null};
    this.countTime = this.countTime.bind(this);
  }
  countTime() {
    var nextSeconds = this.state.currentSecond + 1;
    var nextMinute = this.state.currentMinute;
    var nextHour = this.state.nextHour;
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
    this.setState({timer: setInterval(this.countTime, 100)});
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  render() {
    return (
      <div className="MainView row" id="content">
      </div>
    );
  }
}

render(
  <MainView/>,
  document.getElementById('react-clocks')
);
