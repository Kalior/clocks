import React from 'react';
import DigitalClock from '../templates/digitalClock.jsx'

export default class MetricClock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var totalSeconds = this.props.currentMillisecond + this.props.currentSecond * 1000 +
      this.props.currentMinute * 60 * 1000 + this.props.currentHour * 3600 * 1000;
    var totalMetricSeconds = totalSeconds * (100*100*100/(24*60*60));
    var metricHours = Math.floor(totalMetricSeconds / (100*100*1000));
    var metricMinutes = Math.floor((totalMetricSeconds / (100*1000)) % 100);
    var metricSeconds = Math.floor((totalMetricSeconds / 1000) % 100);

    var metricHourText = metricHours, metricMinuteText = metricMinutes, metricSecondText = metricSeconds;
    if (metricSecondText < 100) {
      metricSecondText = "0" + metricSecondText;
    }
    if (metricSecondText < 10) {
      metricSecondText = "0" + metricSecondText;
    }
    if (metricMinuteText < 100) {
      metricMinuteText = "0" + metricMinuteText;
    }
    if (metricMinuteText < 10) {
      metricMinuteText = "0" + metricMinuteText;
    }
    if (metricHourText < 100) {
      metricHourText = "0" + metricHourText;
    }
    if (metricHourText < 10) {
      metricHourText = "0" + metricHourText;
    }
    var metricTime = metricHourText + ":" + metricMinuteText + ":" +  metricSecondText ;
    var description = "Isn't it odd that we have 24 hours, 60 minutes, and 60 seconds? Personally I think it would be " +
      "far more logical if we had 100 hours, 100 minutes, and 100 seconds. The clock " +
      "uses a simple conversion scheme: There are 86400/1000000=0.0864 seconds per metric second. So the total number of " +
      "metric seconds passed this day is calculated, and from that the metric hour, minute and second is calculated. " +
      "Time passes just as fast as it normally does, but with this measurement when the regular clock is 22:00, we still have " +
      "roughly 9 metric hours left of the day. Isn't that great!"
    return(
      <div className="clock">
        <DigitalClock time={metricTime} name={"Metric Clock"} description={description}/>
      </div>
    );
  }
}
