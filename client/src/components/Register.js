import React, { useState, useDebugValue } from "react";
import axios from "axios";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import InputBox from "./InputBox"
import RadioBox from "./RadioBox"
import MultipleComponent from "./MultipleInput";
import PropTypes from "prop-types"

Register.propTypes = {
  intialSkierList: PropTypes.array.isRequired,
}



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


function Register({ intialSkierList, updateLoggedIn, getName, getUserId }) {
  const [firstName, handleFirstNameChange] = useInput("")
  const [lastName, handleLastNameChange] = useInput("");

  const [email, setEmail] = useState("");

  const [password, handlePasswordChange] = useInput("");
  const [sport, handleSportChange] = useInput("ski");
  const [level, handleLevelChange] = useInput("medium");
  const [resorts, addResort, removeResort, editResort] = useArrayState([""]);
  const [languages, addLanguage, removeLanguage, editLanguage] = useArrayState([""]);

  const [showAlert, setShowAlert] = useState(false)

  const history = useHistory();

  const handleEmailChange = (e) => {

    const userEmails = intialSkierList.map(user => user.email)
    if (userEmails.includes(e.target.value)) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
    setEmail(e.target.value)

  }

  const handleClose = () => {
    history.push("/");
  };

  const userData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    sport: sport,
    level: level,
    resorts: resorts,
    languages: languages,
  }

  const addUser = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('/users/register', userData);
      localStorage.setItem("skiBuddyToken", resp.data.token);
      updateLoggedIn(true);
      getName(resp.data.name);
      getUserId(resp.data.id)
      history.push("/");
    }
    catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <Modal
        show={true}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"
            className="text-bordo title-modal">
            Sign up
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          <form onSubmit={(e) => {
            addUser(e)
            // e.preventDefault();
            // console.log(e)
            // if (window.confirm("Register was succesful!"));
          }}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <InputBox
                  type="text"
                  label="First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <InputBox
                  type="text"
                  label="Last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <InputBox
                  showAlert={showAlert}
                  type="email"
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  message={
                    <div className={showAlert ? "alert-box-absolute" : null}>
                      <p className="mb-0">Email address already registered.</p>
                      <p className="mb-0">Please <Link to="/login" className="text-bordo">
                        <b>login</b>
                      </Link>.</p>
                    </div>
                  }

                  required
                />
              </div>
              <div className="form-group col-md-6">
                <InputBox
                  type="password"
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

            </div>
            <div className="form-row">
              <div className="form-group col-md-6 mb-0">
                <label className="text-gray">Sport</label>
              </div>
              <div className="form-group col-md-6 mb-0">
                <label className="text-gray">Level</label>
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
            <div className="form-row">
              <div className="form-group col-md-12">
                <MultipleComponent
                  // onClick={autocompleteResorts}
                  // onFilter={filterSuggestions}
                  // data={resortSuggestions}
                  title="Resorts"
                  items={resorts}
                  onAdd={addResort}
                  onRemove={removeResort}
                  onEdit={editResort}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <MultipleComponent
                  title="Languages"
                  items={languages}
                  onAdd={addLanguage}
                  onRemove={removeLanguage}
                  onEdit={editLanguage}
                  required
                />
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
              disabled={showAlert ? true : false}
              type="submit"
              className="btn btn-blue width-complete"
              // onClick={(e) => addUser(e)}
              onKeyUp={(e) => {
                if (e.keyCode === 13) { return addUser(e) }
              }}

            >
              Submit
            </button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            onClick={handleClose}
          >
            Close
            </Button>

        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default withRouter(Register);

