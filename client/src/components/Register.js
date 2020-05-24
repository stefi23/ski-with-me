import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      sport: "",
      level: "",
      resorts: [""],
      languages: [""],
    };
  }

  addUser() {
    axios("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        sport: this.state.sport,
        level: this.state.level,
        resorts: this.state.resorts,
        languages: this.state.languages,
      },
    }).catch((err) => console.log(err));
  }

  handleInput = (e, index) => {
    e.preventDefault();
    const languages = [...this.state.languages];
    languages[index] = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      languages: languages,
    });
  };

  handleInputResorts = (e, index) => {
    e.preventDefault();
    const resorts = [...this.state.resorts];
    resorts[index] = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      resorts,
    });
  };

  addAnotherLanguage() {
    this.setState({
      languages: [...this.state.languages, ""],
    });
  }
  addAnotherResort() {
    this.setState({
      resorts: [...this.state.resorts, ""],
    });
  }

  handleRemove(index) {
    const languages = [...this.state.languages];
    languages.splice(index, 1);
    this.setState({
      languages: languages,
    });
  }

  handleRemoveResort(index) {
    const resorts = [...this.state.resorts];
    resorts.splice(index, 1);
    this.setState({
      resorts: resorts,
    });
  }

  render() {
    return (
      <div>
        <div className="register">
          <div className="register_inner p-5">
            <h2> Sign Up </h2>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={this.state.firstName}
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={this.state.lastName}
                  onChange={this.handleInput}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>

                <input
                  name="email"
                  onChange={this.handleInput}
                  value={this.state.email}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
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
              <div className="form-group col-md-6 mb-0">
                <label>Sport</label>
              </div>
              <div className="form-group col-md-6 mb-0">
                <label>Level</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sport"
                    id="inlineRadio1"
                    value="ski"
                    onChange={this.handleInput}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    ski
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sport"
                    id="inlineRadio2"
                    value="snowboard"
                    onChange={this.handleInput}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    snowboard
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sport"
                    id="inlineRadio3"
                    value="both"
                    onChange={this.handleInput}
                  />
                  <label className="form-check-label" for="inlineRadio3">
                    both
                  </label>
                </div>
              </div>

              <div className="form-group col-md-6">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="level"
                    id="inlineRadio1"
                    value="beginner"
                    onChange={this.handleInput}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    beginner
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="level"
                    id="inlineRadio1"
                    value="medium"
                    onChange={this.handleInput}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    medium
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="level"
                    id="inlineRadio2"
                    value="advanced"
                    onChange={this.handleInput}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    advanced
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="level"
                    id="inlineRadio3"
                    value="pro"
                    onChange={this.handleInput}
                  />
                  <label className="form-check-label" for="inlineRadio3">
                    pro
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Resorts</label>
              </div>
            </div>
            {this.state.resorts.map((resort, index) => {
              return (
                <div className="form-row" key={index}>
                  <div className="form-group col-md-6">
                    <input
                      value={resort}
                      className="form-control mb-2"
                      onChange={(e) => this.handleInputResorts(e, index)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleRemoveResort(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="form-row">
              <div className="form-group col-md-12">
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.addAnotherResort(e)}
                >
                  Add more resorts
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Languages</label>
              </div>
            </div>

            {this.state.languages.map((language, index) => {
              return (
                <div className="form-row" key={index}>
                  <div className="form-group col-md-6">
                    <input
                      value={language}
                      className="form-control mb-2"
                      onChange={(e) => this.handleInput(e, index)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="form-row">
              <div className="form-group col-md-12">
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.addAnotherLanguage(e)}
                >
                  Add more languages
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
export default Register;
