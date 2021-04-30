import React, { Component } from "react";
import { withRouter } from "react-router-dom";
export class Secret extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>if you're here means that you guessed my secret</h1>
      </div>
    );
  }
}

export default withRouter(Secret);
