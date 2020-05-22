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
                  name="firstName"
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  onChange={this.handleInput}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Email</label>

                <input
                  name="email"
                  onChange={this.handleInput}
                  value={this.state.email}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleInput}
                  value={this.state.password}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4 mb-0">
                <label>Sport</label>
              </div>
              <div className="form-group col-md-4 mb-0">
                <label>Level</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    ski
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    snowboard
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="option3"
                  />
                  <label class="form-check-label" for="inlineRadio3">
                    both
                  </label>
                </div>
              </div>
              <div className="form-group col-md-4">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    beginner
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    medium
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    advanced
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="option3"
                  />
                  <label class="form-check-label" for="inlineRadio3">
                    pro
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-8">
                <label>Resorts</label>

                <input
                  name="resort"
                  onChange={this.handleInput}
                  value={this.state.email}
                  className="form-control"
                />
                <br />
                <button className="btn btn-primary"> Add more resorts </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>Languages</label>

                <input
                  name="language"
                  onChange={this.handleInput}
                  value={this.state.email}
                  className="form-control"
                />
                <br />
                <button className="btn btn-primary">
                  {" "}
                  Add more languages{" "}
                </button>
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
