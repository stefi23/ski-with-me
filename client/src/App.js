import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import SkiersList from "./components/SkiersList";
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
  const [isUserLoggedin, setUserLoggedIn] = useState(false);
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
        setUserLoggedIn(true);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleLogout(){
    setUserLoggedIn(false);
    window.localStorage.removeItem('skiBuddyToken');
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
    <Router>
        <Navbar bg="dark" variant="dark" className="mt-3 mb-3">
          <Navbar.Brand href="/">Ski Buddies</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isUserLoggedin ? (
              <ul className="navbar-nav">
                <li className="nav-item">
              <Navbar.Text>
                Welcome {name} 
                </Navbar.Text>
                </li>
                 <li className="nav-item">
                <Link to="/" 
                      className="nav-link"
                      style={{'color': '#e2e2e5'}}
                      onClick={handleLogout}>Log out
                </Link> 
                </li>
                </ul>
              
              
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" 
                        className="nav-link"
                        style={{'color': '#e2e2e5'}}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link"
                    style={{'color': '#e2e2e5'}}
                    // data-toggle="modal"
                    // data-target="#exampleModalLong"
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
              <Login updateLoggedIn={setUserLoggedIn} getName={getName} />
            )}
          </Route>
          <Route path="/register">
            {<Register updateLoggedIn={setUserLoggedIn} />}
          </Route>
          <Route path="/"></Route>
        </Switch>

    </Router>
       </div>
          </div>   
              <div className="row">
                 <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-12">
                <Search />
                </div>
                <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 mb-12">
                  <div className="row">
                <SkiersList isUserLoggedin={isUserLoggedin}/>
                </div>
                </div>
              </div>
  </div>
  );
}

export default App;
