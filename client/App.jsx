import React, { Component } from 'react';
import FrontContainer from './containers/FrontContainer.jsx';
import SideContainer from './containers/SideContainer.jsx';

import styles from './styles.css';


export default class App extends Component {
  render() {
    return (
      <div>
        <FrontContainer />
        <SideContainer />
      </div>
    );
  }
}
