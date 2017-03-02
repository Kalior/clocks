import React from 'react';
import DigitalClock from '../templates/digitalClock.jsx'
var simpleWeather = require('simpleWeather');


export default class WeatherClock extends React.Component {
  constructor(props) {
    super(props);

    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.showWeather = this.showWeather.bind(this);
    this.showError = this.showError.bind(this);

    this.state = {timeStr: ""};
  }
  componentDidMount() {
    this.getLocation();
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      this.setState({timeStr: "Inaccessible"});
    }
  }
  showPosition(position) {
    this.loadWeather(position.coords.latitude+','+position.coords.longitude);
  }
  showWeather(weather) {
    var timeStr = weather.currently + ":" + weather.temp + ":" + weather.wind.chill;

    this.setState({timeStr: timeStr});
  }
  loadWeather(location, woeid) {
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: 'c',
      success: this.showWeather,
      error: this.showError
    });
  }
  showError(error) {
    this.setState({timeStr: "Inaccessible"});
  }
  render() {
    var description = "";
    return(
      <div className="clock">
        <DigitalClock time={this.state.timeStr} name={"Weather Clock"} description={description}/>
      </div>
    );
  }
}
