import React, {useState} from "react";
import axios from "axios";
import { Link, withRouter, useHistory } from "react-router-dom";
import MultipleComponent from "./MultipleInput";
import InputBox from "./InputBox"
import { Modal, Button } from "react-bootstrap";


const useInput = () => {
  const [value, setValue] = useState("")
  function handleInputChange(event){
    setValue(event.target.value)
  }
  return [value, handleInputChange]
}


function Register(props) {
  const [firstName, handleFirstNameChange ] = useInput()
  const [lastName, handleLastNameChange ] = useInput("");
  const [email, handleEmailChange ] = useInput("");
  const [password, handlePasswordChange ] = useInput("");
  const [sport, handleSportChange ] = useInput("");
  const [level, handleLevelChange ] = useInput("");
  const [resorts, setResorts ] = useState([""]);
  const [languages, setLanguages ] = useState([""]);

  const history = useHistory();
  
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
                  onChange={handleFirstNameChange}
                />
                {/* <InputBox
                  title="First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />*/}
              </div> 
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>
            {/* to check Input Box component !!*/}
                 {/* <InputBox
              title="First name"
              items={firstName}
              onChange={handleFirstNameChange}
            /> */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>

                <input
                  name="email"
                  onChange={handleEmailChange}
                  value={email}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handlePasswordChange}
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
                    onChange={handleSportChange}
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
                    onChange={handleSportChange}
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
                    onChange={handleSportChange}
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
                    onChange={handleLevelChange}
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
                    onChange={handleLevelChange}
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
                    onChange={handleLevelChange}
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
                    onChange={handleLevelChange}
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

