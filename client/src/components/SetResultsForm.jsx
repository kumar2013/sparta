import React from 'react';


class SetResultsForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      first: '',
      second: '',
      third: ''
    };
  }
    
  handleSubmit(e) {
    e.preventDefault();
    let formData = this.state;
    const url = 'http://localhost:8000/set-result';
    
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(formData)
    });
    
    this.setState({
      first: '',
      second: '',
      third: ''
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
          <input className="form-control" name="first" type="text" placeholder="first" value={this.state.first} onChange={this.handleChange} required/>
        </div>
        <div className="form-group">
          <input className="form-control" name="second" type="text" placeholder="second" value={this.state.second} onChange={this.handleChange} required/>
        </div>
        <div className="form-group">
          <input className="form-control" name="third" type="text" placeholder="third" value={this.state.third} onChange={this.handleChange} required/>
        </div>
        <button type="submit" className="btn btn-success">Set Results</button>
      </form>
    );
  }
}


export default SetResultsForm