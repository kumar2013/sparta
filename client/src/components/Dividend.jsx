import React from 'react';
import io from 'socket.io-client';

let socket = io('http://localhost:8000');


class Dividend extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      win: '',
      place: '',
      exact: '',
      quinella: ''
    };
    
    socket.on('dividends', (data) => {
      if (!data) {
        this.setState({win:'',place:'',exact:'',quinella:''});
      } else {
        this.setState({
          win: data.win,
          place: data.place,
          exact: data.exact,
          quinella: data.quinella
        });
      }
    });
  }
  
  render() {
    return (
      <section className="ss-dividend">
        <h3>Dividend</h3>
        { this.state.win ? <ShowDividends {...this.state} result={this.props.result}/> : <NoResults /> }
      </section>
    );
  }
  
  componentDidMount() {
    socket.emit('sendDividends');
  }
}

function ShowDividends(props) {
  return (
    <ul>
      <li>Win - Runner {props.result.first} - ${props.win=='NaN'?0:props.win}</li>
      <li>Place - Runner {props.result.first} - ${props.place.first=='NaN'?0:props.place.first}</li>
      <li>Place - Runner {props.result.second} - ${props.place.second=='NaN'?0:props.place.second}</li>
      <li>Place - Runner {props.result.third} - ${props.place.third=='NaN'?0:props.place.third}</li>
      <li>Exact - Runners {props.result.first},{props.result.second} - ${props.exact=='NaN'?0:props.exact}</li>
      <li>Quinella - Runners {props.result.first},{props.result.second} - ${props.quinella=='NaN'?0:props.quinella}</li>
    </ul>
  );
}

function NoResults() {
  return (
    <p>The race does not have any results yet; set the results in order to see the calculated dividends.</p>
  );
}



export default Dividend