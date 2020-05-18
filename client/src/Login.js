import React, { Component } from "react";
import "./App.css";
import axios from "axios";

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

  getProtectedData = () => {
    axios("/users/profile", {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((results) => {
        console.log(results.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <input
          name="email"
          onChange={this.handleInput}
          value={this.state.email}
          className="form-control"
        />
        <input
          type="password"
          name="password"
          onChange={this.handleInput}
          value={this.state.password}
          className="form-control"
        />
        <button className="btn btn-primary" onClick={this.attemptLogin}>
          Submit
        </button>
        <button className="btn btn-primary" onClick={this.getProtectedData}>
          Get Protected Data
        </button>
      </div>
    );
  }
}
