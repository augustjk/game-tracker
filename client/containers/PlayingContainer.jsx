import React, { Component } from 'react';

const PlayingContainer = props => {
  return (
    <div>
      <div id="score-wrapper">
        <p id="p1score">{props.p1Score[props.p1Score.length - 1]}</p>
        <p id="colon">:</p>
        <p id="p2score">{props.p2Score[props.p2Score.length - 1]}</p>

        <p id={`serve${props.serving[props.serving.length - 1]}`}>&#8595;</p>

        <p id="p1-display-name">{props.p1name}</p>
        <p id="p2-display-name">{props.p2name}</p>
      </div>
      <div id="graph-wrapper" />
      <div id="button-wrapper">
        <button id="inc-p1" onClick={props.handleScoreButton}>
          +
        </button>
        <button id="inc-p2" onClick={props.handleScoreButton}>
          +
        </button>
        <button id="undo" onClick={props.handleScoreButton}>
          Undo
        </button>
      </div>
    </div>
  );
};

export default PlayingContainer;
