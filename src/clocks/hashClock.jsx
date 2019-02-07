import React from 'react'
import bcrypt from 'bcryptjs'
import DigitalClock from '../templates/digitalClock.jsx'

export default class HashClock extends React.Component {
    state = {
        hash: ""
    }

    componentWillReceiveProps(nextProps) {
        // Any time props.email changes, update state.
        if (nextProps.currentMinute !== this.props.currentMinute) {
            let time = nextProps.currentHour.toString() + ":" + nextProps.currentMinute.toString()

            bcrypt.hash(time, 10, (err, hash) => {
                this.setState({
                    hash: hash
                });
            })
        }
    }

    componentDidMount() {
        let time = this.props.currentHour.toString() + ":" + this.props.currentMinute.toString()

        bcrypt.hash(time, 10, (err, hash) => {
            this.setState({
                hash: hash
            });
        })
    }

    render() {
        let description = `The hashed and salted version of the current hour and minute.
            Really useful if you, for instance, wanted to store the current time
            securely in a database.`
        return (
            <div className='clock hash-clock'>
                <DigitalClock time={this.state.hash} name={'Hash Clock'} description={description} />
            </div>
        )
    }
}
