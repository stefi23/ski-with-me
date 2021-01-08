import React, { useState, useDebugValue } from "react";
import axios from "axios";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import InputBox from "./InputBox"
import RadioBox from "./RadioBox"
import MultipleComponent from "./MultipleInput";



const useInput = (input) => {
  const [value, setValue] = useState(input)
  function handleInputChange(event) {
    setValue(event.target.value)
  }
  return [value, handleInputChange]
}

const useArrayState = (initialState) => {
  const [array, setArray] = useState(initialState)
  function handleAdd(newElement) {
    setArray([...array, newElement])
  }
  function handleRemove(index) {
    const newArray = array.filter((item, indexToMatch) => {
      if (index === indexToMatch) {
        return false;
      }
      return true
    })
    setArray(newArray)
  }

  function handleEdit(newValue, index) {
    const updateArray = array.map((item, indexToMatch) => {
      if (index === indexToMatch) {
        return newValue
      }
      return item
    })
    setArray(updateArray)
  }


  return [array, handleAdd, handleRemove, handleEdit]
}


function Register(props) {
  const [firstName, handleFirstNameChange] = useInput()
  const [lastName, handleLastNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [sport, handleSportChange] = useInput("ski");
  const [level, handleLevelChange] = useInput("medium");
  const [resorts, addResort, removeResort, editResort] = useArrayState([""]);
  const [languages, addLanguage, removeLanguage, editLanguage] = useArrayState([""]);

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
        props.getName(results.data.name);
        props.getUserId(results.data.id)
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
              <InputBox
                type="text"
                label="First name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="form-group col-md-6">
              <InputBox
                type="text"
                label="Last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <InputBox
                type="email"
                label="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group col-md-6">
              <InputBox
                type="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
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
                <RadioBox
                  name="sport"
                  label="ski"
                  value="ski"
                  onChange={handleSportChange}
                  defaultChecked={sport === "ski"}
                  id="sport-ski"
                />
              </div>
              <div className="form-check form-check-inline">
                <RadioBox
                  name="sport"
                  label="snowboard"
                  value="snowboard"
                  onChange={handleSportChange}
                  defaultChecked={sport === "snowboard"}
                  id="sport-snowboad"
                />
              </div>
              <div className="form-check form-check-inline">
                <RadioBox
                  name="sport"
                  label="both"
                  value="both"
                  onChange={handleSportChange}
                  defaultChecked={sport === "both"}
                  id="sport-both" />
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="form-check form-check-inline">
                <RadioBox
                  name="level"
                  label="beginner"
                  value="beginner"
                  onChange={handleLevelChange}
                  defaultChecked={level === "beginner"}
                  id="level-beginner"
                />
              </div>
              <div className="form-check form-check-inline">
                <RadioBox
                  name="level"
                  label="medium"
                  value="medium"
                  onChange={handleLevelChange}
                  defaultChecked={level === "medium"}
                  id="level-medium" />
              </div>
              <div className="form-check form-check-inline">
                <RadioBox
                  name="level"
                  label="advanced"
                  value="advanced"
                  onChange={handleLevelChange}
                  defaultChecked={level === "advanced"}
                  id="level-advanced" />
              </div>
              <div className="form-check form-check-inline">
                <RadioBox
                  name="level"
                  label="pro"
                  value="pro"
                  onChange={handleLevelChange}
                  defaultChecked={level === "pro"}
                  id="level-pro" />
              </div>
            </div>
          </div>
          <MultipleComponent
            title="Resorts"
            items={resorts}
            onAdd={addResort}
            onRemove={removeResort}
            onEdit={editResort}
          />
          <MultipleComponent
            title="Languages"
            items={languages}
            onAdd={addLanguage}
            onRemove={removeLanguage}
            onEdit={editLanguage}
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

