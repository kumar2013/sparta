import React from 'react';

import NavBar from './NavBar';
import BettingCalculator from './BettingCalculator';
import BettingResults from './BettingResults';


class Main extends React.Component {
  constructor(props) {
    super(props);  
  }
  
  render() {
    return (
      <div>
        <NavBar />
        <div className="container ss-body">
          <div className="row">
            <BettingCalculator />
            <BettingResults />
          </div>
        </div>
      </div>
    );
  }
}


export default Main