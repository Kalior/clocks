import React from 'react'

import {
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'

const ClockGoogleMap = withScriptjs(
  withGoogleMap(
    props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={2}
        center={{ lat: props.latitude, lng: props.longitude }}
      >
        <Marker
          position={{lat: props.latitude, lng: props.longitude}}
        />
      </GoogleMap>
    )
  )
)

export default class MapClock extends React.Component {
  constructor (props) {
    super(props)
    this.updateMap = this.updateMap.bind(this)

    this.state = {
      currentHour: this.props.currentHour,
      currentMinute: this.props.currentMinute,
      currentSecond: this.props.currentSecond,
      currentMillisecond: this.props.currentMillisecond,
      latitude: 58,
      longitude: 12
    }
  }
  componentDidMount () {
    this.updateMap()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentMinute !== this.state.currentMinute) {
      this.setState({
        currentHour: nextProps.currentHour,
        currentMinute: nextProps.currentMinute,
        currentSecond: nextProps.currentSecond,
        currentMillisecond: nextProps.currentMillisecond
      })
      this.updateMap()
    }
  }
  updateMap () {
    let latitude = (((this.state.currentHour / 24) * 180) - 90)
    let longitude = (((this.state.currentMinute / 60) * 360) - 180)

    this.setState({latitude: latitude, longitude: longitude})
  }

  render () {
    let loadingElement =
      <div className='map-clock'>
        <i
          className='fa fa-spinner'
          style={{
            display: `block`,
            width: `80px`,
            height: `80px`,
            margin: `150px auto`,
            animation: `fa-spin 2s infinite linear`
          }}
        />
      </div>
    let mapDiv =
      <ClockGoogleMap
        googleMapURL='https://maps.googleapis.com/maps/api/js?key={key}'
        loadingElement={loadingElement}
        containerElement={
          <div className='map-clock' />
        }
        mapElement={
          <div className='map-clock' />
        }
        latitude={this.state.latitude}
        longitude={this.state.longitude}
      />

    let description = `This clock updates every minute with the current time displayed as a position on a map.
      I Know what you are thinking: "The time doesn't translate into a position in any sensible way".
      What you then presumably don't know is that if you divide the current hour by 24, multiply by 180 and
      subtract 90 you actually get the current hour in latitude. A similar procedure gives the current minute
      in longitude, and as such you can now not only ask the question "What is the time?" but also
      "Where is the time?" and get a (sort of) reasonable answer.
    `
    let name = 'Map Clock'
    return (
      <div className='clock-wrapper'>
        <div className='clock-name clock-attribute'>
          {name}
        </div>
        <div className='clock-attribute'>
          {mapDiv}
        </div>
        <div className='clock-description clock-attribute'>
          <hr />
          {description}
        </div>
      </div>
    )
  }
}
