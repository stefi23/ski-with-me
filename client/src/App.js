import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { Navbar } from "react-bootstrap";

function App() {
  const [isUserLoggedin, updateLoggedIn] = useState(false);
  const [name, getName] = useState("");

  useEffect(() => {
    axios("/users/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("skiBuddyToken"),
      },
    })
      .then((result) => {
        console.log(result.data);
        getName(result.data.name);
        updateLoggedIn(true);
      })
      .catch((error) => console.log(error));
  });

  return (
    <Router>
      <div className="container">
        <Navbar bg="dark" variant="dark" className="m-3">
          <Navbar.Brand href="/">Ski Buddies</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isUserLoggedin ? (
              <Navbar.Text>Welcome {name} </Navbar.Text>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link"
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/login">
            {isUserLoggedin ? (
              <Redirect to="/" />
            ) : (
              <Login updateLoggedIn={updateLoggedIn} getName={getName} />
            )}
          </Route>
          <Route path="/register">
            {<Register updateLoggedIn={updateLoggedIn} />}
          </Route>
          <Route path="/"></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
