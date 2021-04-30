import React, { Component } from "react";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Secret from "./components/Secret.js";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Profile from "./components/Profile.js";
import Protected from "./components/Protected.js";
import axios from "axios";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      isAuth: false,
    };
  }
  login() {
    this.setState({
      islogged: true,
    });
  }
  logout() {
    this.setState({
      islogged: false,
      isAuth: false,
    });
    localStorage.removeItem("token");
  }

  verify() {
    const token = localStorage.getItem("token");
    const header = {
      authorization: `Bearer ${token}`,
    };
    axios
      .get("http://localhost:3001/api/verify", { headers: header })
      .then(({ data }) => {
        console.log("data", data);
        if (token) {
          if (token === data.token) {
            this.setState({ islogged: true, isAuth: true });
          } else {
            this.setState({ islogged: false, isAuth: false });
          }
        } else {
          this.setState({ islogged: false, isAuth: false });
        }
      });
  }

  componentWillMount() {
    this.verify();
    this.login();
  }

  render() {
    return (
      <Router>
        <div className=" bg-indigo-500 w-screen top-0 z-40 ">
          <div className="flex items-center justify-between text-white  w-11/12 inline-block py-1">
            <Link to="/">
              <h1 className="cursor-pointer text-3xl font-bold ml-20 ">Home</h1>
            </Link>
            <div className=" ml-20">
              {this.state.islogged === false ? (
                <div>
                  <Link to="signup">
                    <h1 className="cursor-pointer text-3xl font-bold ">
                      {" "}
                      Signup
                    </h1>{" "}
                  </Link>
                  <Link to="login">
                    <h1 className="cursor-pointer text-3xl font-bold ">
                      {" "}
                      Login
                    </h1>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/">
                    <h1
                      className="cursor-pointer text-3xl font-bold "
                      onClick={this.logout.bind(this)}
                    >
                      {" "}
                      Logout
                    </h1>
                  </Link>
                  <Link to="/profile">
                    <h1 className="cursor-pointer text-3xl font-bold ">
                      {" "}
                      Profile
                    </h1>
                  </Link>
                  <Link to="/secret">
                    <h1 className="cursor-pointer text-3xl font-bold ">
                      {" "}
                      secret
                    </h1>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <Switch>
          <Route path="/" exact component={Home} />
          {this.state.isAuth === false ? (
            <div>
              <Route
                path="/signup"
                component={() => (
                  <Signup
                    isAuth={this.state.islogged}
                    handleClick={() => this.login()}
                  />
                )}
              />
              <Route
                path="/login"
                component={() => <Login handleClick={() => this.login()} />}
              />
            </div>
          ) : (
            <Redirect strict from="/profile/" to="/secret" />
          )}
        </Switch>

        <Protected
          path="/profile"
          component={Profile}
          isAuth={this.state.islogged}
        />
        <Protected
          path="/secret"
          component={Secret}
          isAuth={this.state.islogged}
        />
      </Router>
    );
  }
}
export default App;
