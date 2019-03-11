import React, { Component } from 'react';
import FrontContainer from './containers/FrontContainer.jsx';
import SideContainer from './containers/SideContainer.jsx';

import styles from './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.ws = new WebSocket('ws://localhost:3000/ws');
  }

  render() {
    return (
      <div className="app">
        <div className="front-container">
          <FrontContainer ws={this.ws} />
        </div>
        <div className="side-container">
          <SideContainer ws={this.ws} />
        </div>
      </div>
    );
  }
}

export default  App;