import React, { Component } from 'react';
import { MDBContainer, MDBInput } from 'mdbreact';
import {
  InputGroup,
  FormControl,
  ButtonToolbar,
  Button
} from 'react-bootstrap';

const QueueComponent = props => {
  return (
    <div className="queue-container">
      <div id="queue-wrapper">
        <ol>
          {props.queue.map((el, id = 0) => (
            <li key={'q' + id++}>{el}</li>
          ))}
        </ol>
      </div>
      <div id="queue-input-wrapper">
          <form id="queue-input-form" onSubmit={props.enqueue}>
          <MDBInput
            type="text"
            value={props.queueInput}
            label="Enter Name"
            onChange={props.queueOnChange}
            autoComplete="off"
          />
          
          <Button
            variant="outline-primary"
            id="join-queue"
            onClick={props.enqueue}
          >
            Join Queue
          </Button>
          </form>
      </div>
    </div>
  );
};

export default QueueComponent;

      