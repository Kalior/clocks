import React from 'react'
import {render} from 'react-dom'
import IdleTimer from 'react-idle-timer'
import RandomSeed from 'random-seed'
import Elevator from 'elevator.js'

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
import BrailleClock from './clocks/brailleClock.jsx'
import VoiceClock from './clocks/voiceClock.jsx'
import MapClock from './clocks/mapClock.jsx'
import PomodoroClock from './clocks/pomodoroClock.jsx'

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
      BrailleClock,
      YearClock,
      PrimeClock,
      FikaClock,
      VoiceClock,
      MapClock,
      PomodoroClock
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
      timeout: 50000,
      elevator: null
    }
  }
  countTime = () => {
    let nextMillisecond = this.state.currentMillisecond + 10 // count 10 milliseconds each update
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

    let elevator = new Elevator({
      targetElement: document.querySelector('#top-clock'),
      duration: 1000,
      verticalPadding: 10
    })
    this.setState({timer: setInterval(this.countTime, 10), topClockIndex: index, elevator: elevator})
  }
  componentWillUnmount () {
    clearInterval(this.state.timer)
  }
  updateTopClockIndex = i => {
    if (this.state.elevator != null) {
      this.state.elevator.elevate()
    }
    this.setState({topClockIndex: i})
  }
  onActive = () => {
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
  onIdle = () => {
    if (!this.state.idle) {
      this.setState({idle: true})
    }
  }
  render () {
    const {
      clockTypes,
      currentHour,
      currentMinute,
      currentSecond,
      currentMillisecond,
      randomPageloadSeed,
      topClockIndex,
      timeout
    } = this.state

    const clocksWithRow = clockTypes.map((clockType, i) => {
        return (
          <div className='click-clock' key={i} onClick={this.updateTopClockIndex.bind(this, i)}>
            {React.createElement(clockType, {
              currentHour: currentHour,
              currentMinute: currentMinute,
              currentSecond: currentSecond,
              currentMillisecond: currentMillisecond,
              isTop: false,
              randomPageloadSeed: randomPageloadSeed
            })}
          </div>
        )
    })

    return (
      <IdleTimer activeAction={this.onActive} idleAction={this.onIdle} timeout={timeout}>
        <div className='main-view' id='content'>
          <div id='top-clock' className='top-clock'>
            {React.createElement(clockTypes[topClockIndex], {
              currentHour: currentHour,
              currentMinute: currentMinute,
              currentSecond: currentSecond,
              currentMillisecond: currentMillisecond,
              isTop: true,
              randomPageloadSeed: randomPageloadSeed
            })}
          </div>

          <div className='all-clocks'>
            {clocksWithRow}
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
