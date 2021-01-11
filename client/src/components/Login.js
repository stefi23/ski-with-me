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

  const attemptLogin = (e) => {
    e.preventDefault()
    axios("/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      data: {
        email: email,
        password: password,
      },
    })
      .then((results) => {
        localStorage.setItem("skiBuddyToken", results.data.token);
        props.updateLoggedIn(true);
        props.getName(results.data.name);
        props.getUserId(results.data.id)
        console.log(results.data)
      })
      .catch((err) => {
        if (err.response.data.message === "Login not successful") {
          setShowAlert(true)
        }
        console.log("er", err.response.data)
      })
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
          <form>
            <label className="text-gray">Email:</label>
            <input
              name="email"
              onChange={handleEmail}
              value={email}
              className="form-control mb-2"
              // id="validationDefault01"
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
              onClick={(e) => email || password ? attemptLogin(e) : null}
              onKeyUp={(e) => {
                if (e.keyCode === 13) { return attemptLogin }
              }}
            // disabled={email === "" || password === ""}
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
