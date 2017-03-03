import React from 'react';

export default class SpeedClock extends React.Component {
  constructor(props) {
    super(props);
    var totalSeconds = this.props.currentSecond + this.props.currentMinute * 60 + this.props.currentHour * 3600;
    this.state = {currentHour: this.props.currentHour, currentMinute: this.props.currentMinute, currentSecond: this.props.currentSecond,
     currentMillisecond: this.props.currentMillisecond, prevHourX: 0, prevMinuteX: 0, prevSecondX: 0, isTop: this.props.isTop};
    this.renderCanvas = this.renderCanvas.bind(this);
    this.drawRoundRect = this.drawRoundRect.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentMillisecond != this.state.currentMillisecond && !this.state.isTop) {
      this.setState({currentHour: nextProps.currentHour, currentMinute: nextProps.currentMinute,
        currentSecond: nextProps.currentSecond, currentMillisecond: nextProps.currentMillisecond});
      this.renderCanvas();
    }
  }
  componentDidMount() {
    if (!this.state.isTop) {
      this.renderCanvas();
    }
  }
  renderCanvas() {
    var canvas = document.getElementById('speed-canvas');
    var ctx = canvas.getContext('2d');

    var objectHeight = canvas.height / 5;
    var objectWidth = canvas.width / 5;
    var objectMargin = (canvas.height - (objectHeight * 3)) / 2;

    var hourSpeed = this.state.currentHour / 10 + 0.1;
    var minuteSpeed = this.state.currentMinute / 10 + 0.1;
    var secondSpeed = this.state.currentSecond / 10 + 0.1;
    var hourX = (hourSpeed + this.state.prevHourX) % (canvas.width + objectWidth);
    var minuteX = (minuteSpeed + this.state.prevMinuteX) % (canvas.width + objectWidth);
    var secondX = (secondSpeed + this.state.prevSecondX) % (canvas.width + objectWidth);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#444';
    //Hour
    this.drawRoundRect(ctx, hourX - objectWidth, 0, objectWidth, objectHeight, 5, true, true);
    //Minute
    this.drawRoundRect(ctx, minuteX - objectWidth, objectHeight + objectMargin, objectWidth, objectHeight, 5, true, true);
    //Second
    this.drawRoundRect(ctx, secondX - objectWidth, (objectHeight + objectMargin) * 2, objectWidth, objectHeight, 5, true, true);

    var topCanvas = document.getElementById('speed-canvas-top');
    if (topCanvas) {
      var topCtx = topCanvas.getContext('2d');
      topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
      topCtx.drawImage(canvas, 0, 0);
    }

    this.setState({prevHourX: hourX, prevMinuteX: minuteX, prevSecondX: secondX});
  }
  drawRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }

  }
  render() {
    var description = "This clock is quite similar to the Bar Clock in that it interprets the digit " +
      "at each position on the clock. It does, however, use these digits in a somewhat different fashion. " +
      "It simply moves the object corresponding to the digit number of pixels (times a constant factor to " +
      "make it slower) forward. So, if for instance the object furthest down moves slowly, " +
      "the number of seconds this minute is rather low. And if that same object suddenly stops, a whole minute " +
      "has gone by and the object above it starts moving faster. Appreciating subtle speed " +
      "differences is the key to being able to interpret this clock.";
    var name = "Speed Clock";
    var canvas;
    if (this.props.isTop) {
      canvas = <canvas id="speed-canvas-top" className="speed-clock" height="200" width="400"></canvas>;
    } else {
      canvas = <canvas id="speed-canvas" className="speed-clock" height="200" width="400"></canvas>;
    }
    return(
      <div className="clock-wrapper">
        <div className="clock-name clock-attribute">
          {name}
        </div>
        <div className="clock-attribute">
          {canvas}
        </div>
        <div className="clock-description clock-attribute">
          <hr></hr>
          {description}
        </div>
      </div>
    );
  }
}
