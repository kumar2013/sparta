import React from 'react';

class PlaceBetForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      poolType: 'win',
      runner: '',
      stake: ''
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const url = 'http://localhost:8000/betting';
    const formData = this.state;
    
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(formData)
    });
    
    this.setState({
      poolType: 'win',
      runner: '',
      stake: ''
    });
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <select className="form-control" name="poolType" value={this.state.poolType} onChange={this.handleChange}>
            <option value="win">Win</option>
            <option value="place">Place</option>
            <option value="exact">Exact</option>
            <option value="quinella">Quinella</option>
          </select>
        </div>
        <div className="form-group">
          <input className="form-control" name="runner" type="text" placeholder="runner" value={this.state.runner} onChange={this.handleChange} required/>
        </div>
        <div className="form-group">
          <input className="form-control" name="stake" type="text" placeholder="stake" value={this.state.stake} onChange={this.handleChange} required/>
        </div>
        <button type="submit" className="btn btn-primary">Place Bet</button>
      </form>
    );
  }
}


export default PlaceBetForm
