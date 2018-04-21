import React from 'react'
import Moment from 'moment'

export default class YearClock extends React.Component {
  constructor (props) {
    super(props)
    let days = Moment().dayOfYear()
    this.state = {isTop: this.props.isTop, dayOfYear: days}
    this.renderCanvas = this.renderCanvas.bind(this)
  }
  componentDidMount () {
    this.renderCanvas()
  }
  renderCanvas () {
    let canvas
    if (this.state.isTop) {
      canvas = document.getElementById('year-canvas-top')
    } else {
      canvas = document.getElementById('year-canvas')
    }
    let ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let drawing = new Image()
    drawing.src = 'year-clock.png'
    let r = (canvas.width / 2) - 5
    let degree = (-3.14 * 0.5) + (3.14 / 6) + ((this.state.dayOfYear / 365) * 3.14 * 2)
    ctx.lineWidth = 3
    ctx.strokeStyle = '#c8c8c8'
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.lineTo((canvas.width / 2) + (r * Math.cos(degree)), (canvas.height / 2) + (r * Math.sin(degree)))

    drawing.onload = function () {
      ctx.drawImage(drawing, 0, 0)
      ctx.stroke()
    }
  }
  render () {
    var description = 'This clock is based upon the slow watch, but instead of showing a whole day it shows ' +
      'the entire year. Sadly, this clock manages to show the current month pretty accurately. Thankfully, it is ' +
      'virtually impossible to tell the time of day with this clock. Would actually ' +
      'be pretty cool to have a watch like this.'
    var name = 'Year Clock'
    var canvas
    if (this.props.isTop) {
      canvas = <canvas id='year-canvas-top' className='year-clock' height='200' width='200' />
    } else {
      canvas = <canvas id='year-canvas' className='year-clock' height='200' width='200' />
    }
    return (
      <div className='clock-wrapper'>
        <div className='clock-name clock-attribute'>
          {name}
        </div>
        <div className='clock-attribute'>
          {canvas}
        </div>
        <div className='clock-description clock-attribute'>
          <hr />
          {description}
        </div>
      </div>
    )
  }
}
