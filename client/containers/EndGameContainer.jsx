import React, { Component } from 'react';
import {
  InputGroup,
  FormControl,
  ButtonToolbar,
  Button
} from 'react-bootstrap';

const EndGameContainer = props => {
  let winner;
  if (
    props.p1Score[props.p1Score.length - 1] >
    props.p2Score[props.p2Score.length - 1]
  ) {
    winner = props.p1name;
  } else {
    winner = props.p2name;
  }

  return (
    <div id="endgame-wrapper">
      <p id="winner">{winner} Wins!</p>
      <div id="end-buttons">
        <ButtonToolbar>
          <Button
            variant="outline-primary"
            id="rematch"
            onClick={props.handleEndGame}
          >
            REMATCH
          </Button>

          <Button
            variant="outline-primary"
            id="winner-stay"
            onClick={props.handleEndGame}
          >
            Winner Stays
          </Button>

          <Button
            variant="outline-primary"
            id="both-leave"
            onClick={props.handleEndGame}
          >
            Both Leave
          </Button>
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default EndGameContainer;
