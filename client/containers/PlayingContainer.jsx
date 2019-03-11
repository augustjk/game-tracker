import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

const PlayingContainer = props => {
  const { p1Score, p2Score } = props;
  const transformedP1Score = p1Score.map((el, idx) => {
    return { x: idx + 1, y: el };
  });
  const transformedP2Score = p2Score.map((el, idx) => {
    return { x: idx + 1, y: el };
  });

  let maxY;
  let maxX = p1Score.length + 4;
  const playerMaxScore = Math.max(
    p1Score[p1Score.length - 1],
    p2Score[p2Score.length - 1]
  );
  maxY = playerMaxScore >= props.maxScore ? maxScore + 2 : props.maxScore + 2;

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
      <div id="graph-wrapper">
        <VictoryChart
          theme={VictoryTheme.material}
          maxDomain={{ y: maxY, x: maxX }}
        >
          {/* <line /> */}
          <VictoryLine
            data={transformedP1Score}
            style={{
              data: { stroke: 'blue' },
              parent: { border: '1px solid blue' }
            }}
          />
          <VictoryLine
            data={transformedP2Score}
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
          />
        </VictoryChart>
      </div>
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
