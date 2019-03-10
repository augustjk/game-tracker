import React, { Component } from 'react';
import axios from 'axios';

import NoGameContainer from './NoGameContainer.jsx';
import PlayingContainer from './PlayingContainer.jsx';
import EndGameContainer from './EndGameContainer.jsx';

class FrontContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p1name: 'Michael',
      p2name: 'Augustine',
      gameState: 0,
      p1Score: [0],
      p2Score: [0],
      serving: [],
      maxScore: 21,
      endGameChoice: null,
    }
    this.setP1Name = this.setP1Name.bind(this);
    this.setP2Name = this.setP2Name.bind(this);
    this.startMatch = this.startMatch.bind(this);
    this.setMaxScore = this.setMaxScore.bind(this);
    this.setServing = this.setServing.bind(this);
    this.handleScoreButton = this.handleScoreButton.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
  }
  
  componentDidMount() {
    axios.post('/action', {action: 'GET_STATE'})
    .then(res=>{
      this.setState(res.data);
    })
    .catch(err=>console.error(err));
  }

  setP1Name(e) {
    this.setState({p1name: e.target.value});
  }

  setP2Name(e) {
    this.setState({p2name: e.target.value});
  }

  setServing(e) {
    let serving;
    if (e.target.id === 'p1-serve') {
      serving = 1;
    } else if (e.target.id === 'p2-serve') {
      serving = 2;
    }
    this.setState({serving});
  }

  setMaxScore(e) {
    let maxScore;
    if (e.target.id === '21-point') {
      maxScore = 21;
    } else if (e.target.id === '11-point') {
      maxScore = 11;
    }
    this.setState({maxScore});
  }

  startMatch() {
    const body = {
      action: 'START',
      payload: {
        p1name: this.state.p1name,
        p2name: this.state.p2name,
        maxScore: this.state.maxScore,
        serving: this.state.serving,
      }
    }
    axios.post('/action', body)
    .then(res=>{
      if (res.status === 200) {
        this.setState(res.data);
      }
    })
    .catch(err=>console.error(err));
  }

  handleScoreButton(e) {
    const body = {};
    switch(e.target.id) {
      case 'inc-p1':
        body.action = 'INCREMENT';
        body.payload = {player: 1};
        break;
      case 'inc-p2':
        body.action = 'INCREMENT';
        body.payload = {player: 2};
        break;
      case 'undo':
        body.action = 'UNDO';
        break;
    }

    axios.post('/action', body)
    .then(res=>{
      this.setState(res.data);
    })
    .catch(err=>console.error(err));
  }

  handleEndGame(e) {
    const body = {action: 'RESTART'};
    switch(e.target.id) {
      case 'rematch':
        body.payload = 2;
        break;
      case 'winner-stay':
        body.payload = 1;
        break;
      case 'both-leave':
        body.payload = 0;
        break;
    }

    axios.post('/action', body)
    .then(res=>{
      this.setState(res.data);
    })
    .catch(err=>console.error(err));
  }

  render() {
    switch (this.state.gameState) {
      case 0:
        return (<NoGameContainer
          p1name={this.state.p1name}
          p2name={this.state.p2name}
          serving={this.state.serving}
          maxScore={this.state.maxScore}
          setP1Name={this.setP1Name}
          setP2Name={this.setP2Name}
          startMatch={this.startMatch}
          setMaxScore={this.setMaxScore}
          setServing={this.setServing}
          />) ;
      case 1:
       return (<PlayingContainer
          p1name={this.state.p1name}
          p2name={this.state.p2name}
          serving={this.state.serving}
          p1Score={this.state.p1Score}
          p2Score={this.state.p2Score}
          handleScoreButton={this.handleScoreButton}
         />);
      case 2:
        return (<EndGameContainer
          p1name={this.state.p1name}
          p2name={this.state.p2name}
          p1Score={this.state.p1Score}
          p2Score={this.state.p2Score}
          handleEndGame={this.handleEndGame}
        />);
      default:
        return null;
    }
  }
}

export default FrontContainer;