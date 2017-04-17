import React from 'react';

import PlaceBetForm from './PlaceBetForm';
import SetResultsForm from './SetResultsForm';
import SetInterestForm from './SetInterestForm';

import InputForm from './InputForm';

class Controls extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <section className="ss-controls row">
        <div className="col-md-12">
          <h3>Controls</h3>
          <InputForm />
        </div>
      </section>
    );
  }
}


export default Controls


// Instead of using <InputForm /> you can use the following forms

//  <PlaceBetForm />
//  <SetResultsForm />
//  <SetInterestForm />