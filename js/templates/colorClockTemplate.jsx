import React from 'react'

export default class ColorClockTemplate extends React.Component {
  render () {
    return (
      <div className='clock-wrapper'>
        <div className='clock-name clock-attribute'>
          {this.props.name}
        </div>
        <div className='clock-attribute'>
          <div className='color-clock' style={this.props.clockStyle} />
        </div>
        <div className='clock-description clock-attribute'>
          <hr />
          {this.props.description}
        </div>
      </div>
    )
  }
}
