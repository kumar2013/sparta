import React from 'react';


class Pool extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <article className="col-md-3">
        <div className="ss-pool">
          <h4>{this.props.sum} $</h4>
          <p>{this.props.type}</p>
        </div>
      </article>
    );
  }
}


export default Pool