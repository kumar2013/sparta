import React from 'react';

class SetInterestForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      win: '',
      place: '',
      exact: '',
      quinella: ''
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const url = 'http://localhost:8000/interest';
    const formData = this.state;
    console.log('Interests: ', formData);
    
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(formData)
    });
    
    this.setState({
      win: '',
      place: '',
      exact: '',
      quinella: ''
    });
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  render() {
    return (
      <form className="form-inline ss-interest" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input className="form-control" name="win" type="text" placeholder="win" value={this.state.win} onChange={this.handleChange} required/>
        </div>
        <div className="form-group">
          <input className="form-control" name="place" type="text" placeholder="place" value={this.state.place} onChange={this.handleChange} required/>
        </div>
        <div className="form-group">
          <input className="form-control" name="exact" type="text" placeholder="exact" value={this.state.exact} onChange={this.handleChange} required/>
        </div>
        <div className="form-group">
          <input className="form-control" name="quinella" type="text" placeholder="quinella" value={this.state.quinella} onChange={this.handleChange} required/>
        </div>
        <button type="submit" className="btn btn-primary">Set Interest</button>
      </form>
    );
  }
}


export default SetInterestForm