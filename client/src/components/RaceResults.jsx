import React from 'react';


class RaceResults extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <section className="ss-race-results">
        <h3>Race Results</h3>
        { this.props.result.first ? <ShowResults {...this.props.result} /> : <NoResults /> }
      </section>
    );
  }
}

function ShowResults(props) {
  return (
    <ul>
      <li>First: {props.first}</li>
      <li>Second: {props.second}</li>
      <li>Third: {props.third}</li>
    </ul>
  );
}

function NoResults() {
  return (
    <div>
      <p>The race does not have any results yet.</p>
      <p>Set the results using Set Results button</p>
    </div>
  );
}


export default RaceResults