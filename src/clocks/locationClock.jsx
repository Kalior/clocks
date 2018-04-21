import React from 'react'
import DigitalClock from '../templates/digitalClock.jsx'

export default class LocationClock extends React.Component {
  constructor (props) {
    super(props)

    this.state = {timeStr: ''}
  }
  componentDidMount () {
    this.getLocation()
  }
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError)
    } else {
      this.setState({timeStr: 'Inaccessible'})
    }
  }
  showPosition = position => {
    var timeStr = Math.round(position.coords.latitude) + ':' + Math.round(position.coords.longitude) + ':'
    if (position.coords.altitude) {
      timeStr = timeStr + Math.round(position.coords.altitude)
    } else {
      timeStr = timeStr + '00'
    }

    this.setState({timeStr: timeStr})
  }
  showError = () => {
    this.setState({timeStr: 'Inaccessible'})
  }
  render () {
    var description = `Since a lot of the clocks here actually display time, even if so in a confounding way, this one does not.
      Instead, it uses geolocation to find your location and then displays your latitude, longitude, and altitude rounded
      to the closest integer as time. Some tips to reading this one: if the first number is large that probably means that your
      angular distance to the equator also is large. Furthermore, if the second number is large that most likely indicates that
      your east-west distance to Greenwich is large. I don't think the last number requires any further explanation.`
    return (
      <div className='clock'>
        <DigitalClock time={this.state.timeStr} name={'Location Clock'} description={description} />
      </div>
    )
  }
}
