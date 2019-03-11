import React, { Component } from 'react';
import axios from 'axios';
import QueueComponent from '../components/QueueComponent.jsx';
import RankingComponent from '../components/RankingComponent.jsx';
import { Tabs, Tab } from 'react-bootstrap';

class SideContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarState: 0,
      queue: [],
      ranking: [],
      queueInput: '',
      key: 'queue'
    };
    this.enqueue = this.enqueue.bind(this);
    this.queueOnChange = this.queueOnChange.bind(this);
  }

  enqueue(e) {
    e.preventDefault();
    let body = {
      action: 'ENQUEUE',
      payload: this.state.queueInput
    };
    axios
      .post('/action', body)
      .then(res => {
        console.log(res.data);
        this.setState({
          queue: res.data,
          queueInput: ''
        });
      })
      .catch(err => console.log(err));
  }

  queueOnChange(e) {
    this.setState({ queueInput: e.target.value });
  }

  componentDidMount() {
    axios
      .get('/sidebar')
      .then(res => {
        this.setState(res.data);
      })
      .catch(err => console.error(err));

    this.props.ws.onmesage = e => {
      const parsed = JSON.parse(e.data);
      if (parsed.sidebar) {
        // parsed = { sidebar: boolean , ranking: [], queue: []}
        console.log(parsed);
        // then setState of the queue and ranking
        delete parsed.sidebar;
        this.setState(parsed);
      }
    };
  }

  render() {
    return (
      <Tabs
        id="sidebar-tab"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
        <Tab eventKey="ranking" title="Ranking">
          <RankingComponent ranking={this.state.ranking} />
        </Tab>
        <Tab eventKey="queue" title="Queue">
          <QueueComponent
            queue={this.state.queue}
            queueInput={this.state.queueInput}
            queueOnChange={this.queueOnChange}
            enqueue={this.enqueue}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default SideContainer;
