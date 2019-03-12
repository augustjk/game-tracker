import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

const RankingComponent = props => {
  return (
    <Table striped bordered hover variant="dark">
      <tbody>
        <tr>
          <th>Username</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Win Rate</th>
        </tr>
        {props.ranking
          .sort((b, a) => {
            return a.wins / (a.wins + a.losses) - b.wins / (b.wins + b.losses);
          })
          .map((el, id = 1) => (
            <tr key={id}>
              <td>{el.username}</td>
              <td>{el.wins}</td>
              <td>{el.losses}</td>
              <td>{((el.wins / (el.losses + el.wins)) * 100).toFixed(0)}%</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default RankingComponent;
