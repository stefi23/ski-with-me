import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  attemptLogin = () => {
    console.log("login");
    axios("/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then((results) => {
        localStorage.setItem("token", results.data.token);
        this.props.updateLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  // getProtectedData = () => {
  //   axios("/users/profile", {
  //     headers: { "x-access-token": localStorage.getItem("token") },
  //   })
  //     .then((results) => {
  //       console.log(results.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  render() {
    return (
      <div className="login">
        <div className="login_inner p-5">
          <h1>Welcome Back</h1>

          <input
            name="email"
            onChange={this.handleInput}
            value={this.state.email}
            className="form-control m-2"
            placeholder="Enter email"
          />
          <input
            type="password"
            name="password"
            onChange={this.handleInput}
            value={this.state.password}
            className="form-control m-2"
            placeholder="Enter password"
          />

          <button className="btn btn-primary m-2" onClick={this.attemptLogin}>
            Login NOW
          </button>
          <div className="m-2">
            <p>
              Don't have an account?
              <span>
                {" "}
                <Link to="/register" className="">
                  Sign Up
                </Link>
              </span>
            </p>
            <button className="btn" onClick={this.attemptLogin}>
              <Link to="/" className="">
                Close
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
