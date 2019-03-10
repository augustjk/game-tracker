import React, { Component } from 'react';
import FrontContainer from './containers/FrontContainer.jsx';
import SideContainer from './containers/SideContainer.jsx';

import styles from './styles.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="front-container">
          <FrontContainer />
        </div>
        <div className="side-container">
          <SideContainer />
        </div>
      </div>
    );
  }
}
