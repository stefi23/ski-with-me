import React from "react";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      country: "",
    };
  }

  //gets list of all users from the DB
  getUsers = () => {
    axios("/users").then((response) => {
      this.setState({ users: response.data });
    });
  };

  //adds users to the DB
  addUser() {
    fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        country: this.state.country,
      }),
    }).then(this.getUsers);
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.country
    ) {
      this.props.history.push(`/`);
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // handleClearForm = e => {
  //   this.setState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     country: ""
  //   });
  // };

  render() {
    return (
      <div>
        <div className="login">
          <div className="login_inner p-5">
            <h2> Sign Up </h2>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Name"
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Country</label>
                <select
                  id="inputState"
                  className="form-control"
                  name="country"
                  onChange={this.handleInput}
                >
                  <option>Choose...</option>
                  <option>Barcelona</option>
                  <option>Madrid</option>
                  <option>London</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleInput}
                />
                <small id="passwordHelpInline" className="text-muted">
                  Must be 8-20 characters long.
                </small>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label className="form-check-label">
                  I agree to terms and conditions
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.addUser()}
              // onSubmit={() => {
              //   if (window.confirm("Register was succesful!"));
              // }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
