import React, { Component } from 'react';

const QueueComponent = (props) => {

  return (
    <div>
      <div id="queue-wrapper">
        <ol>
          Queue
          {props.queue.map((el, id = 0) => <li key={'q'+ id++}>{el}</li>)}
        </ol>
      </div>
      <div id="queue-input-wrapper">
        <form onSubmit={props.enqueue}>
        <input type="text" value={props.queueInput} placeholder="Enter Name" onChange={props.queueOnChange}/>
        <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default QueueComponent;