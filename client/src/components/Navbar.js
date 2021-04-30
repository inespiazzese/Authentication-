import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div className=" fixed w-screen top-0 z-40 ">
        <div className="flex flex-col items-center justify-between text-white  w-11/12 py-2 inline-block ">
          <h1 className="cursor-pointer text-3xl font-bold ">HOME</h1>

          <h1 className="cursor-pointer text-3xl font-bold"> Signup</h1>
          <h1 className="cursor-pointer text-3xl font-bold"> Login</h1>
        </div>
      </div>
    );
  }
}

export default Navbar;
