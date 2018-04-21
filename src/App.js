import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import MainView from './MainView.jsx'
import './scss/app.scss'

const ClockRoutes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={MainView} />
      <Route path='/:clockId' component={MainView} />
    </Switch>
  </Router>
)

class App extends Component {
  render () {
    return <ClockRoutes />
  }
}

export default App
