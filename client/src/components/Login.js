import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import InputBox from "./InputBox"

import { useInput } from "../hooks/useInput"

function Login({ updateLoggedIn, getName, getUserId }) {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [showAlert, setShowAlert] = useState(false)

  const history = useHistory();

  const handleClose = () => {
     history.goBack()
  };

  const focusRef = useRef(null)
  
  const loginData = {
    email,
    password
  }

  useEffect(() => {
    focusRef.current.focus()
  }, [])

  const attemptLogin = async (e) => {
    console.log('-- -- -- attemptLogin -- -- --')
    e.preventDefault()
    try {

      
      const resp = await axios.post('/users/login', loginData);

      console.log('-- -- updateLoggedIn -- --', updateLoggedIn)
      updateLoggedIn(true);
      console.log('resp', resp)
      localStorage.setItem("skiBuddyToken", resp.data.token);

      console.log('after request', updateLoggedIn)

      
      getName(resp.data.name);
      getUserId(resp.data.id)
      
    }
    catch (err) {
      if (err.response.status === 400) {
        setShowAlert(true)
      }
    }
  };

  return (
    <>
      <Modal
        show={true}
        // dialogClassName="modal-40w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-bordo title-modal" id="contained-modal-title-vcenter ">
            Welcome Back
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert ?

            (<div>
              <p className="alert-box mb-4">username or password incorrect</p>
            </div>) : null
          }
          <form className="needs-validation"
            data-testid="login-form"
            onSubmit={(e) => email && password ? attemptLogin(e) : null}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <InputBox
                  type="text"
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  ref={focusRef}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <InputBox
                  type="password"
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>
            <button className="btn btn-blue mb-2 mt-3 width-complete">
              Login
          </button>
          </form>

          <div className="">
            <p className="text-gray mt-2 mb-1 text-center">
              Don't have an account?
              <span>
                {" "}
                <Link to="/register" className="text-blue">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </Modal.Body>
      </Modal >
    </>
  );
}


export default Login;
