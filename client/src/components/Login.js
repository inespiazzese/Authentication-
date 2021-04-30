import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log("staaaate", this.state);
      }
    );
  }
  login() {
    if (this.state.email === "" || this.state.password === "") {
      Swal.fire("Oops...", "fields are empty!", "error");
    } else {
      axios
        .post("http://localhost:3001/api/login", this.state)
        .then(({ data }) => {
          if (data.message === "user not found") {
            Swal.fire("Oops...", "invalid mail", "error");
          } else if (data.message === "incorrect password") {
            Swal.fire("Oops...", "incorrect password", "error");
          } else if (data.message === "success") {
            const token=data.token
            localStorage.setItem("token",token)
            Swal.fire("hey!", "you're logged!", "success");
            this.props.handleClick();
            this.profile();
          } else {
            Swal.fire("Oops...", "failed to log", "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  profile = () => {
    const { history } = this.props;
    if (history) history.push("/profile");
  };

  render() {
    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center text-indigo-500">Login</h1>

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={this.handleChange.bind(this)}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={this.handleChange.bind(this)}
            />
            <button
              onClick={this.login.bind(this)}
              type="submit"
              className="w-full text-center py-3 rounded-full bg-indigo-500 text-black hover:bg-green-dark focus:outline-none my-1 "
            >
              Login
            </button>
            <div className="flex justify-between items-center mt-3">
              <hr className="w-full" />{" "}
              <span className="p-4 text-gray-400 mb-1">OR</span>
              <hr className="w-full" />
            </div>
            <button className="uppercase h-12 mt-3 text-white w-full rounded-full bg-blue-800 hover:bg-blue-900">
              <i className="fa fa-facebook mr-2"></i>Facebook
            </button>
            <button className="uppercase h-12 mt-3 text-white w-full rounded-full bg-black hover:bg-black">
              <i className="fa fa-github mr-2"></i>Github
            </button>

            <button className="uppercase h-12 mt-3 text-white w-full rounded-full bg-red-800 hover:bg-red-900">
              <i className="fa fa-google mr-2"></i>Google
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
