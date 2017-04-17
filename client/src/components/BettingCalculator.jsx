import React from 'react';

import Pools from './Pools';
import Controls from './Controls';


class BettingCalculator extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <section className="col-md-7">
        <Pools />
        <Controls />
      </section>
    );
  }
}


export default BettingCalculator