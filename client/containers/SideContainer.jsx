import React, { Component } from 'react';
import axios from 'axios';
import QueueComponent from '../components/QueueComponent.jsx'
import RankingComponent from '../components/RankingComponent.jsx'

class SideContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarState: 0,
      queue: [],
      ranking: [],
      queueInput: '',
    }
    this.enqueue = this.enqueue.bind(this);
    this.queueOnChange = this.queueOnChange.bind(this);
  }

  enqueue(e) {
    e.preventDefault();
    let body = {
      action: 'ENQUEUE',
      payload: this.state.queueInput,
    }
    axios.post('/action', body)
     .then(res => {
       this.setState({queue: res.data});
     })
     .catch(err => console.log(err))
  }

  queueOnChange(e) {
    this.setState({queueInput: e.target.value});
  }

  componentDidMount() {
    axios.get('/sidebar')
    .then(res => {
      this.setState(res.data)
    })
    .catch(err=>console.error(err));
  }

  render() {
    switch (this.state.sidebarState) {
      case 0:
        return (
          <div>
            <QueueComponent
            queue={this.state.queue}
            queueInput={this.state.queueInput}
            queueOnChange={this.queueOnChange}
            enqueue={this.enqueue}
            />
          </div>
        )
      case 1:
        return (
          <div>
            <RankingComponent ranking={this.state.ranking}/>
          </div>
        )
      default:
        return null;
    }
    
  }
}

export default SideContainer;