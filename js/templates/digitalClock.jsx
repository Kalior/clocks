import React from 'react';

export default class DigitalClock extends React.Component {
  render() {
    return(
      <div className="clock-wrapper">
        <div className="clock-name clock-attribute">
          {this.props.name}
        </div>
        <div className="digital-clock clock-attribute">
          {this.props.time}
        </div>
        <div className="clock-description clock-attribute">
          {this.props.description}
        </div>
      </div>
      )
  }
}
