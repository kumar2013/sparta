import React from 'react';
import io from 'socket.io-client';

import RaceResults from './RaceResults';
import Dividend from './Dividend';

let socket = io('http://localhost:8000');

class BettingResults extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      first: '',
      second: '',
      third: ''
    };
    
    socket.on('bettingResults', (data) => {
      if (!data) {
        this.setState({first:'',second:'',third:''});
      } else {
        this.setState({
          first: data.first,
          second: data.second,
          third: data.third
        });
      }
    });
  }
  
  render() {
    return (
      <section className="col-md-4 col-md-offset-1">
        <RaceResults result={this.state} />
        <Dividend result={this.state} />
      </section>
    );
  }
  
  componentDidMount() {
    socket.emit('sendResults');
  }
}


export default BettingResults