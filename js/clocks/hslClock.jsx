import React from 'react';

export default class HSLClock extends React.Component {
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
    var canvas = document.getElementById("hsl-clock-canvas");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    var hue = Math.floor(this.state.currentHour / 23 * 360);
    var sat = this.state.currentMinute + 20;
    var light = this.state.currentSecond + 20;
    var color = "hsl(" + hue +"," + sat +"%," + light +"%)";
    console.log(color);
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
    var description = "This clock displays the current time as an HSL value in a simliar fashion to the RGB Clock. " +
      "However, in an attempt to make this a more reasonable clock, the saturation and lightness percentage is in the range [20,79]."
      "I do find, however, that this clock is easier to read than the RGB one, mainly beacuse every hour, the hue is the same while only the lightness " +
      " and saturation is differing with minute and second."
    var name = "HSL Clock";
    return(
      <div className="color-clock clock clock-wrapper">
        <div className="clock-name clock-attribute">
          {name}
        </div>
        <div className="clock-attribute">
          <canvas id="hsl-clock-canvas" className="clock-canvas" width={200} height={200}/>
        </div>
        <div className="clock-description clock-attribute">
          {description}
        </div>
      </div>
    );
  }
}
