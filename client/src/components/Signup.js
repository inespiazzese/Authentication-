import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log("state", this.state);
      }
    );
  }
  signup() {
    if (this.emailregex() === false) {
      Swal.fire("Oops...", "invalid email!", "error");
    } else if (this.state.password !== this.state.confirmPassword) {
      Swal.fire("Oops...", "passwords are not matching!", "error");
    } else if (this.state.password.length < 8) {
      Swal.fire("Oops...", "password too short!", "error");
    } else {
      axios
        .post("http://localhost:3001/api/signup", this.state)
        .then(({ data }) => {
          console.log("data", data);
          if (data.message === "user already exists") {
            Swal.fire("Oops...", "user already exists!", "error");
          } else {
            var token = data.token;
            localStorage.setItem("token", token);
            Swal.fire("hey!", "you're signed up!", "success");
            this.props.handleClick();
            this.profile();
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

  emailregex() {
    if (
      this.state.email[0] !== "." &&
      this.state.email[this.state.email.length - 1] !== "."
    ) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email);
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center text-indigo-500">
              Signup
            </h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="firstName"
              placeholder="firstName"
              onChange={this.handleChange.bind(this)}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="lastName"
              placeholder="lastName"
              onChange={this.handleChange.bind(this)}
            />

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
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={this.handleChange.bind(this)}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded-full bg-indigo-500 text-black hover:bg-green-dark focus:outline-none my-1 "
              onClick={this.signup.bind(this)}
            >
              Create Account
            </button>
            <button className="uppercase h-12 mt-3 text-white w-full rounded-full bg-blue-800 hover:bg-blue-900">
              <i className="fa fa-facebook mr-2"></i>Facebook
            </button>
            <button className="uppercase h-12 mt-3 text-white w-full rounded-full bg-black hover:bg-black">
              <i className="fa fa-github mr-2"></i>Github
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
