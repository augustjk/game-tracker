import React, { Component } from 'react';

const NoGameContainer = (props) => {

  return (
    <div>
      <div id="name-input-wrapper">
        <div className="name-input">
          <input className="playername" id="p1name" name="p1name" type="text" value={props.p1name} placeholder="Enter Name" onChange={props.setP1Name}/>
          <p>Player 1</p>
        </div>
        <div className="name-input">
          <input className="playername" id="p2name" name="p1name" type="text" value={props.p2name} placeholder="Enter Name" onChange={props.setP2Name}/>
          <p>Player 2</p>
        </div>
      </div>
      <div id="radio-wrapper">
          <div className="radio">
            <p>Match Point</p>
            <input type="radio" id="21-point" name="match-point" defaultChecked onClick={props.setMaxScore} />
            <label htmlFor="21-point">21</label>
            <input type="radio" id="11-point" name="match-point" onClick={props.setMaxScore} />
            <label htmlFor="11-point">11</label>
          </div>

          <div className="radio">
            <p>First Serve</p>
            <input type="radio" id="p1-serve" name="first-serve" defaultChecked onClick={props.setServing} />
            <label htmlFor="p1-serve">{props.p1name}</label>
            <input type="radio" id="p2-serve" name="first-serve" onClick={props.setServing} />
            <label htmlFor="p2-serve">{props.p2name}</label>
          </div>

      </div>
      <button id="start-button" onClick={props.startMatch}>Start</button>
    </div>
  );
}

export default NoGameContainer;