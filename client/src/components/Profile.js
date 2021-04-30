import React, { Component } from "react";
import { withRouter } from "react-router-dom";
export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className="items-center  text-3xl text-indigo-500 font-bold">
          Ka3boura
        </h1>
      </div>
    );
  }
}

export default withRouter(Profile);
