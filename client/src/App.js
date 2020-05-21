import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoggedIn from "./LoggedIn.js";
import { Navbar } from "react-bootstrap";

function App() {
  const [isUserLoggedin, updateLoggedIn] = useState(false);

  return (
    <Router>
      <div className="container">
        <Navbar bg="dark" variant="dark" className="m-3">
          <Navbar.Brand href="/">Ski Buddies</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isUserLoggedin ? (
              <Navbar.Text>Welcome Name</Navbar.Text>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          {isUserLoggedin ? (
            <Route path="/" />
          ) : (
            <Route
              path="/login"
              render={(props) => <Login updateLoggedIn={updateLoggedIn} />}
            />
          )}
          <Route path="/register" component={Register}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
