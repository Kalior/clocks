import React from 'react';
import {render} from 'react-dom';

class MainView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="MainView row" id="content">
      </div>
    );
  }
}

render(
  <MainView/>,
  document.getElementById('react-clocks')
);
