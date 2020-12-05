import React, {useState} from "react";
import axios from "axios";
import { Link, withRouter, useHistory } from "react-router-dom";
import MultipleComponent from "./MultipleInput";
import { Modal, Button } from "react-bootstrap";


function Register(props) {
  const [firstName, setFirstName ] = useState("");
  const [lastName, setLastName ] = useState("");
  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  const [sport, setSport ] = useState("");
  const [level, setLevel ] = useState("");
  const [resorts, setResorts ] = useState([""]);
  const [languages, setLanguages ] = useState([""]);

  const history = useHistory();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSport = (e) => {
    setSport(e.target.value);
  };

  const handleLevel = (e) => {
    setLevel(e.target.value);
  };
  
  const handleClose = () => {
    history.push("/");
  };

  const addUser = () => {
    axios("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        sport: sport,
        level: level,
        resorts: resorts,
        languages: languages,
      },
    })
      .then((results) => {
        localStorage.setItem("skiBuddyToken", results.data.token);
        props.updateLoggedIn(true);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  }


    return (
      <>
        <Modal
          show={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Sign up
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 py-5">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstName}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastName}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>

                <input
                  name="email"
                  onChange={handleEmail}
                  value={email}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handlePassword}
                  value={password}
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
                    onChange={handleSport}
                    defaultChecked={sport === "ski"}
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
                    onChange={handleSport}
                    defaultChecked={sport === "snowboard"}
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
                    defaultChecked={sport === "both"}
                    onChange={handleSport}
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
                    onChange={handleLevel}
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
                    onChange={handleLevel}
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
                    onChange={handleLevel}
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
                    onChange={handleLevel}
                  />
                  <label className="form-check-label" for="inlineRadio3">
                    pro
                  </label>
                </div>
              </div>
            </div>
            <MultipleComponent
              title="Resorts"
              items={resorts}
              onChange={(resorts) => {
                setResorts(
                  resorts,
                );
              }}
            />
            <MultipleComponent
              title="Languages"
              items={languages}
              onChange={(languages) => {
                setLanguages(
                  languages,
                );
              }}
            />
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
              onClick={() => addUser()}
              // onSubmit={() => {
              //   if (window.confirm("Register was succesful!"));
              // }}
            >
              Submit
            </button>
            <button className="btn" 
            >
              <Link to="/" className="">
                Back to homepage
              </Link>
            </button>
          </Modal.Body>
          <Modal.Footer>
            <Button
            onClick={handleClose}
            >
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default withRouter(Register);

