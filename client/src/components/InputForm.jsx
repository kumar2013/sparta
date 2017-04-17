import React from 'react';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.setResult = this.setResult.bind(this);
    this.setInterest = this.setInterest.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {inputData: '', logs: []};
  }
  
  handleChange(e) {
    this.setState({inputData: e.target.value});
  }
  
  placeBet(e) {
    e.preventDefault();
    const url = 'http://localhost:8000/betting';
    const bet = this.state.inputData;
    
    if (validateBet(bet)) {   
      let input = bet.split(':');
      let betInput = {};
      
      if (input[0] == 'W') {betInput.poolType = 'win'}
      else if (input[0] == 'P') {betInput.poolType = 'place'}
      else if (input[0] == 'E') {betInput.poolType = 'exact'}
      else if (input[0] == 'Q') {betInput.poolType = 'quinella'}
      
      betInput.runner = input[1];
      betInput.stake = input[2];
      
      postFormData(betInput, url);
    } else {
      const log = "Invalid input, Bet should have exactly 3 values in this format, E.g: 'W:2:3' or 'P:3:1' or 'E:2,3:23' or 'Q:3,2:11'";
      this.addLog(log);
    }
    this.setState({inputData: ''});
  }
  
  setResult(e) {
    e.preventDefault();
    const url = 'http://localhost:8000/set-result';
    const result = this.state.inputData;
    
    if (validateResult(result)) {
      let input = result.split(':');
      let betResult = {
        first: input[1],
        second: input[2],
        third: input[3]
      }
      postFormData(betResult, url);
    } else {
      const log = "Invalid input, Results should have exactly 4 values in this format, E.g: 'R:2:3:1'";
      this.addLog(log);
    }
    this.setState({inputData: ''});
  }
  
  setInterest(e) {
    e.preventDefault();
    const url = 'http://localhost:8000/interest';
    const interest = this.state.inputData;
    
    if (validateInterest(interest)) {
      let input = interest.split(':');
      let rates = {
        win: input[1],
        place: input[2],
        exact: input[3],
        quinella: input[4]
      }
      postFormData(rates, url);
    } else {
      const log = "Invalid input, Interest rates should have exactly 5 values in this format, E.g: 'I:15:12:18:18'";
      this.addLog(log);
    }
    this.setState({inputData: ''});
  }
  
  addLog(log) {
    let newArray = this.state.logs.slice();    
    newArray.push(log);   
    this.setState({logs:newArray});
  }
  
  onKeyPress(e) {
    if (e.which === 13) {
      e.preventDefault();
    }
  }
  
  render() {
    const command = this.state.inputData;
    const isEnabled = command.length > 0;
    let logs = this.state.logs.map((log, index) => <li key={index.toString()}>{log}</li>);
    
    return (
      <div>
        <form className="ss-input-form" onKeyPress={this.onKeyPress}>
          <div className="form-group">
            <input className="form-control" name="win" type="text" placeholder="command" value={this.state.inputData} onChange={this.handleChange} required/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.placeBet} disabled={!isEnabled}>
            Place Bet</button>
          <button type="submit" className="btn btn-success" onClick={this.setResult} disabled={!isEnabled}>
            Set Result</button>
          <button type="submit" className="btn btn-default" onClick={this.setInterest} disabled={!isEnabled}>
            Set Interest</button>
        </form>
        <div className="ss-logs-wrapper">
          <ul>
            {logs}
          </ul>
        </div>
      </div>
    );
  }
}

function validateInterest(command) {
  const interestRegex = /[I](:)[0-9]{1,2}(:)[0-9]{1,2}(:)[0-9]{1,2}(:)[0-9]{1,2}/g;

  if (interestRegex.test(command)) {
    return true;
  }
  
  return false;
}

function validateBet(command) {
  const winRegex = /^[W](:)[0-9]{1,2}(:)[0-9]{1,2}$/g;
  const placeRegex = /^[P](:)[0-9]{1,2}(:)[0-9]{1,2}$/g;
  const exactRegex = /^[E](:)[0-9]{1,2}(,)[0-9]{1,2}(:)[0-9]{1,2}$/g;
  const quinellaRegex = /^[Q](:)[0-9]{1,2}(,)[0-9]{1,2}(:)[0-9]{1,2}$/g;

  if (winRegex.test(command) || placeRegex.test(command) || exactRegex.test(command) || quinellaRegex.test(command)) {
    return true;
  }
  
  return false;
}

function validateResult(command) {
  const resultRegex = /^[R](:)[0-9]{1,2}(:)[0-9]{1,2}(:)[0-9]{1,2}$/g;
  
  if (resultRegex.test(command)) {
    return true;
  }
  
  return false;
}

function postFormData(value, url) {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(value)
  });
}


export default InputForm