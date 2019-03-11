import React, { Component } from 'react';

const RankingComponent = props => {
  return (
    <div>
      <ol>
        Rankings
        {props.ranking.map((el, id = 1) => (
          <li key={id}>
            Username: {el.username} Wins: {el.wins} Losses {el.losses} Ratio:{' '}
            {(el.wins / el.losses).toFixed(2)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RankingComponent;
