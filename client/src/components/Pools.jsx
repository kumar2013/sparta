import React from 'react';
import io from 'socket.io-client';

import Pool from './Pool';

let socket = io('http://localhost:8000');

class Pools extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      win: 0,
      place: 0,
      exact: 0,
      quinella: 0
    };
    
    socket.on('poolsResult', (data) => {
      this.setState(data);
    });
  }
  
  handleReset() {
    socket.emit('reset');
    this.setState({
      win: 0,
      place: 0,
      exact: 0,
      quinella: 0
    });
  }
  
  render() {
    return (
      <section className="row ss-pools">
        <section className="col-md-12 ss-pool-title">
          <article className="col-md-6">
            <h3>Pools</h3>
          </article>
          <article className="col-md-6">
            <button className="btn btn-default" onClick={this.handleReset}>Reset Race</button>
          </article>
        </section>
        <section className="col-md-12 ss-pool-counters">
          <Pool type={'win'} sum={this.state.win} />
          <Pool type={'place'} sum={this.state.place} />
          <Pool type={'exact'} sum={this.state.exact} />
          <Pool type={'quinella'} sum={this.state.quinella} />
        </section>
      </section>
    );
  }
  
  componentDidMount() {
    socket.emit('sendPoolsData');
  }
}


export default Pools