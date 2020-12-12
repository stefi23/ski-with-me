import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const attemptLogin = () => {
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
      })
      .catch((err) => console.log(err));
  };

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
            Welcome Back
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            name="email"
            onChange={handleEmail}
            value={email}
            className="form-control m-2"
            placeholder="Enter email"
          />
          <input
            type="password"
            name="password"
            onChange={handlePassword}
            value={password}
            className="form-control m-2"
            placeholder="Enter password"
          />
          <button className="btn btn-primary m-2" onClick={attemptLogin}>
            Login NOW
          </button>
          <div className="m-2">
            <p>
              Don't have an account?
              <span>
                {" "}
                <Link to="/register" className="">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
