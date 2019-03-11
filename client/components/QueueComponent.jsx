import React, { Component } from 'react';

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
        <form onSubmit={props.enqueue}>
          <input
            type="text"
            value={props.queueInput}
            placeholder="Enter Name"
            onChange={props.queueOnChange}
          />
          <button id="join-queue" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QueueComponent;
