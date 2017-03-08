import React from 'react'
import {render} from 'react-dom'
import IdleTimer from 'react-idle-timer'
import RandomSeed from 'random-seed'

import ScrambleClock from './clocks/scrambledClock.jsx'
import ColorClock from './clocks/colorClock.jsx'
import WrongOrderClock from './clocks/wrongOrder.jsx'
import HSLClock from './clocks/hslClock.jsx'
import BarClock from './clocks/barClock.jsx'
import MetricClock from './clocks/metricClock.jsx'
import LocationClock from './clocks/locationClock.jsx'
import SpeedClock from './clocks/speedClock.jsx'
import RomanClock from './clocks/romanClock.jsx'
import ShuffleClock from './clocks/shuffleClock.jsx'
import YearClock from './clocks/yearClock.jsx'
import PrimeClock from './clocks/primeClock.jsx'
import FikaClock from './clocks/fikaClock.jsx'

var moment = require('moment')

class MainView extends React.Component {
  constructor (props) {
    super(props)
    let currentHour = parseInt(moment().format('HH'))
    let currentMinute = parseInt(moment().format('mm'))
    let second = parseInt(moment().format('ss'))
    let millisecond = parseInt(moment().format('SSS'))

    let rand = RandomSeed.create(millisecond)

    let clockTypes = [
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
      YearClock,
      PrimeClock,
      FikaClock
    ]

    this.state = {
      currentHour: currentHour,
      currentMinute: currentMinute,
      currentSecond: second,
      currentMillisecond: millisecond,
      timer: null,
      topClockIndex: 0,
      clockTypes: clockTypes,
      randomPageloadSeed: rand.random(),
      idle: false,
      timeout: 50000
    }

    this.countTime = this.countTime.bind(this)
    this.updateTopClockIndex = this.updateTopClockIndex.bind(this)
    this.onActive = this.onActive.bind(this)
    this.onIdle = this.onIdle.bind(this)
  }
  countTime () {
    let nextMillisecond = this.state.currentMillisecond + 10
    let nextSeconds = this.state.currentSecond
    let nextMinute = this.state.currentMinute
    let nextHour = this.state.currentHour
    if (nextMillisecond >= 1000) {
      nextMillisecond = nextMillisecond % 1000
      nextSeconds++
      if (nextSeconds >= 60) {
        nextSeconds = 0
        nextMinute++
        if (nextMinute >= 60) {
          nextMinute = 0
          nextHour++
          if (nextHour >= 24) {
            nextHour = 0
          }
        }
      }
    }
    this.setState({currentSecond: nextSeconds, currentMinute: nextMinute, currentHour: nextHour, currentMillisecond: nextMillisecond})
  }
  componentDidMount () {
    let seed = this.state.currentMinute
    let rand = require('random-seed').create(seed)
    let index = rand.intBetween(0, this.state.clockTypes.length - 1)
    this.setState({timer: setInterval(this.countTime, 10), topClockIndex: index})
  }
  componentWillUnmount () {
    clearInterval(this.state.timer)
  }
  updateTopClockIndex (i) {
    this.setState({topClockIndex: i})
  }
  onActive () {
    if (this.state.idle) {
      let currentHour = parseInt(moment().format('HH'))
      let currentMinute = parseInt(moment().format('mm'))
      let second = parseInt(moment().format('ss'))
      let millisecond = parseInt(moment().format('SSS'))

      this.setState({
        currentHour: currentHour,
        currentMinute: currentMinute,
        currentSecond: second,
        currentMillisecond: millisecond,
        idle: false
      })
    }
  }
  onIdle () {
    if (!this.state.idle) {
      this.setState({idle: true})
    }
  }
  render () {
    var clocksWithRow = []
    var numberOfClocks = this.state.clockTypes.length - 1
    for (var i = 0; i < numberOfClocks; i++) {
      clocksWithRow.push(
        <div className='large-3 medium-6 small-12 columns click-clock' key={i} onClick={this.updateTopClockIndex.bind(this, i)}>
          {React.createElement(this.state.clockTypes[i], {
            currentHour: this.state.currentHour,
            currentMinute: this.state.currentMinute,
            currentSecond: this.state.currentSecond,
            currentMillisecond: this.state.currentMillisecond,
            isTop: false,
            randomPageloadSeed: this.state.randomPageloadSeed
          })}
        </div>
      )
    }
    // Extra for the last item as we want an added class on that one.
    clocksWithRow.push(
      <div className='large-3 medium-6 small-12 columns end click-clock' key={numberOfClocks} onClick={this.updateTopClockIndex.bind(this, numberOfClocks)}>
        {React.createElement(this.state.clockTypes[i], {
          currentHour: this.state.currentHour,
          currentMinute: this.state.currentMinute,
          currentSecond: this.state.currentSecond,
          currentMillisecond: this.state.currentMillisecond,
          isTop: false,
          randomPageloadSeed: this.state.randomPageloadSeed})}
      </div>
      )

    return (
      <IdleTimer activeAction={this.onActive} idleAction={this.onIdle} timeout={this.state.timeout}>
        <div className='main-view row' id='content'>
          <div className='column large-12 small-12'>
            <div className='top-clock row'>
              <div className='large-offset-1 large-10 columns'>
                {React.createElement(this.state.clockTypes[this.state.topClockIndex], {
                  currentHour: this.state.currentHour,
                  currentMinute: this.state.currentMinute,
                  currentSecond: this.state.currentSecond,
                  currentMillisecond: this.state.currentMillisecond,
                  isTop: true,
                  randomPageloadSeed: this.state.randomPageloadSeed
                })}
              </div>
            </div>

            <div className='all-clocks row'>
              {clocksWithRow}
            </div>
          </div>
        </div>
      </IdleTimer>
    )
  }
}

render(
  <MainView />,
  document.getElementById('react-clocks')
)
