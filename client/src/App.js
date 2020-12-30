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
  const [skierList, setSkierList] = useState([])
  const [sport, setSport] = useState("")
  const [level, setLevel] = useState("")

  const getUserdatafromDB = async () => {
    try {
      const resp = await axios.get('/users/profile', {
        headers: {
          "x-access-token": localStorage.getItem("skiBuddyToken")
        }
      }
      );
      getName(resp.data.name);
      setUserLoggedIn(true);
    } catch (err) {
      // Handle Error Here
      console.error("User is not loged in");
    }
  }

  const getSkierListfromDB = async () => {
    try {
      const resp = await axios.get('/everything');
      setSkierList(resp.data)
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const getUsersSportSecific = async () => {
    if (sport) {
      try {
        const resp = await axios.get(`/sport/${sport}`);
        setSkierList(resp.data)
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
  };

  const getSportSearched = (sportSearched) => {
    setSport(sportSearched)
  }

  const getLevelSearched = (levelSearched) => {
    setLevel(levelSearched)
  }



  useEffect(() => {
    if (sport) {
      getUsersSportSecific()
    } else {
      getUserdatafromDB()
      getSkierListfromDB()
    }
  }, [sport]);

  function handleLogout() {
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
                        style={{ 'color': '#e2e2e5' }}
                        onClick={handleLogout}>Log out
                </Link>
                    </li>
                  </ul>


                ) : (
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link to="/login"
                          className="nav-link"
                          style={{ 'color': '#e2e2e5' }}>
                          Login
                  </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/register"
                          className="nav-link"
                          style={{ 'color': '#e2e2e5' }}
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
          <Search getSportSearched={getSportSearched} getLevelSearched={getLevelSearched} />
        </div>
        <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 mb-12">
          <div className="row">
            <SkiersList isUserLoggedin={isUserLoggedin} skierListData={skierList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
