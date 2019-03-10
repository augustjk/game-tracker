import React, { Component } from 'react';
import {
  InputGroup,
  FormControl,
  ButtonToolbar,
  Button
} from 'react-bootstrap';

import { MDBContainer, MDBInput } from 'mdbreact';

const NoGameContainer = props => {
  return (
    <div className="form-container">
      <div id="name-input-wrapper">
        <div className="name-input">
          <MDBContainer className="mt-5">
            <MDBInput
              id="p1name"
              name="p1name"
              type="text"
              value={props.p1name}
              // placeholder="Enter Name"
              label="Enter Player 1 Name"
              onChange={props.setP1Name}
            />
            <MDBInput
              id="p2name"
              name="p2name"
              type="text"
              value={props.p2name}
              // placeholder="Enter Name"
              label="Enter Player 2 Name"
              onChange={props.setP2Name}
            />
          </MDBContainer>
        </div>
      </div>

      <div id="radio-wrapper">
        <div className="radio">
          <p>Match Point</p>
          <input
            type="radio"
            id="21-point"
            name="match-point"
            defaultChecked
            onClick={props.setMaxScore}
          />
          <label htmlFor="21-point">21</label>
          <input
            type="radio"
            id="11-point"
            name="match-point"
            onClick={props.setMaxScore}
          />
          <label htmlFor="11-point">11</label>
        </div>

        <div className="radio">
          <p>First Serve</p>
          <input
            type="radio"
            id="p1-serve"
            name="first-serve"
            defaultChecked
            onClick={props.setServing}
          />
          <label htmlFor="p1-serve">Player 1</label>
          <input
            type="radio"
            id="p2-serve"
            name="first-serve"
            onClick={props.setServing}
          />
          <label htmlFor="p2-serve">Player 2</label>
        </div>
      </div>
      <ButtonToolbar>
        <Button
          variant="outline-primary"
          id="start-button"
          onClick={props.startMatch}
        >
          Start
        </Button>
      </ButtonToolbar>
      {/* <button id="start-button" onClick={props.startMatch}> */}
      {/* Start */}
      {/* </button> */}
    </div>
  );
};

export default NoGameContainer;
