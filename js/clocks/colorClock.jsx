import React from 'react';

export default class ColorClock extends React.Component {
  constructor(props) {
    super(props);
    this.drawClock = this.drawClock.bind(this);
    this.state = {currentHour: this.props.currentHour, currentMinute: this.props.currentMinute, currentSecond: this.props.currentSecond};
  }
  componentDidMount() {
    this.drawClock();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({currentHour: nextProps.currentHour, currentMinute: nextProps.currentMinute, currentSecond: nextProps.currentSecond});
    this.drawClock();
  }
  drawClock() {
    var canvas = document.getElementById("color-clock-canvas");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    var red = Math.floor(this.state.currentHour / 23 * 255);
    var green = Math.floor(this.state.currentMinute / 59 * 255);
    var blue = Math.floor(this.state.currentSecond / 59 * 255);
    var color = "rgb(" + red +"," + green +"," + blue +")";
    // Fill with gradient
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 100;

    context.beginPath();
    var grd = context.createRadialGradient(centerX, centerY, 50, centerX, centerY, radius);
    grd.addColorStop(0, color);
    grd.addColorStop(1, "white");
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle=grd;
    context.fill();
  }
  render() {
    var description = "This clock displays the current time as an RGB value where red is the hour, green is the minute and blue is the second. " +
      "So, in order to read this clock you will have to be fluent in RGB, and be able to appreciate subtle color differences."
    var name = "RGB Clock";
    return(
      <div className="color-clock clock clock-wrapper">
        <div className="clock-name clock-attribute">
          {name}
        </div>
        <div className="clock-attribute">
          <canvas id="color-clock-canvas" width={200} height={200}/>
        </div>
        <div className="clock-description clock-attribute">
          {description}
        </div>
      </div>
    );
  }
}
