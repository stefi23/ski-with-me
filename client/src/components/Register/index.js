import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import InputBox from "../InputBox"
import RadioBox from "../RadioBox"
import MultipleComponent from "../MultipleInput";
import PropTypes from "prop-types"
import { getResortsListfromDB } from './getResortsListfromDB'
import { getLanguagesListfromDB } from './getLanguagesListfromDB'
import { useInput } from "../../hooks/useInput"
import { addUserInDb }  from './addUser'
import { useArrayState }  from './useArrayState'

Register.propTypes = {
  intialSkierList: PropTypes.array.isRequired,
  updateLoggedIn: PropTypes.func.isRequired, 
  getName: PropTypes.func.isRequired,
  getUserId:PropTypes.func.isRequired,
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

  const [resortsDb, setResortsDb] = useState([])
  const [languagesDb, setLanguagesDb] = useState([])

  const [showAlert, setShowAlert] = useState(false)

  const history = useHistory();

  const focusRef = useRef(null)

  const handleEmailChange = (e) => {


  const userEmails = intialSkierList.map(user => user.email)
    setShowAlert(userEmails.includes(e.target.value))
    setEmail(e.target.value)

  }

  const handleClose = () => {
    history.goBack()
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resp = await addUserInDb(userData)
    if(resp.message === "user is already registered"){
        setShowAlert(true)
        return
      }
      localStorage.setItem("skiBuddyToken", resp.token);
      updateLoggedIn(true);
      getName(resp.name);
      getUserId(resp.id)
      history.push("/");
 
  };


  useEffect(() => {
    (async () => {
      const resorts = await getResortsListfromDB()
      const languages = await getLanguagesListfromDB()
      setResortsDb(resorts)
      setLanguagesDb(languages)
    })();
    focusRef.current.focus()
  }, [])


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
          <form 
              data-testid="register-form"
              onSubmit={(e) => {handleSubmit(e)}}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <InputBox
                  type="text"
                  label="First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                  ref={focusRef}
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
                  data={resortsDb}
                  label="Resorts"
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
                  data={languagesDb}
                  label="Languages"
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
              data-testid="btn-register"
              disabled={showAlert ? true : false}
              type="submit"
              className="btn btn-blue width-complete"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withRouter(Register);

