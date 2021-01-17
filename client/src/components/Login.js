import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false)

  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClose = () => {
    history.push("/");
  };


  const loginData = {
    email,
    password
  }

  const attemptLogin = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('/users/login', loginData);
      localStorage.setItem("skiBuddyToken", resp.data.token);
      props.updateLoggedIn(true);
      props.getName(resp.data.name);
      props.getUserId(resp.data.id)
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
          <Modal.Title class="text-bordo title-modal" id="contained-modal-title-vcenter ">
            Welcome Back
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert ?

            (<div>
              <p className="alert-box mb-4">username or password incorrect</p>
            </div>) : null
          }
          <form class="needs-validation"
            onSubmit={(e) => email && password ? attemptLogin(e) : null} >
            <label className="text-gray">Email:</label>
            <input
              name="email"
              onChange={handleEmail}
              value={email}
              className="form-control mb-2"
              required
            />

            <label className="text-gray text-center">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handlePassword}
              value={password}
              className="form-control mb-2"
              required
            />

            <button
              className="btn btn-blue mb-2 mt-3 width-complete"

            // onKeyUp={(e) => {
            //   if (e.keyCode === 13) { return email && password ? attemptLogin(e) : null }
            // }}
            >
              Login
          </button>
          </form>

          <div className="">
            <p class="text-gray mt-2 mb-1 text-center">
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
        {/* <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">Close</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Login;
