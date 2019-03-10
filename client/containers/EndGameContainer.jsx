import React, { Component } from 'react';

const EndGameContainer = (props) => {
  let winner;
  if (props.p1Score[props.p1Score.length-1] > props.p2Score[props.p2Score.length-1]) {
    winner = props.p1name;
  } else {
    winner = props.p2name;
  }

  return (
    <div id="endgame-wrapper">
      <p id="winner">{winner} Wins!</p>
      <button id="rematch" onClick={props.handleEndGame}>Rematch</button>
      <button id="winner-stay" onClick={props.handleEndGame}>Winner Stays</button>
      <button id="both-leave" onClick={props.handleEndGame}>Both Leave</button>
    </div>
  );
}

export default EndGameContainer;