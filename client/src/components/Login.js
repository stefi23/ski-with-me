import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { useInput } from "../hooks/useInput"



const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: '#659CCC',
    },
    '& .MuiInputBase-input': {
      color: '#495057',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#659CCC',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ced4da',
      },
      '&:hover fieldset': {
        borderColor: '#659CCC',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#659CCC',
      },
    },
  },
});

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

  const classes = useStyles();
  
  useEffect(() => {
    focusRef.current.focus()
  }, [])

  const attemptLogin = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('/users/login', loginData);
      updateLoggedIn(true);
      localStorage.setItem("skiBuddyToken", resp.data.token);      
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
                <TextField  className={classes.root}
                            id= "Email"
                            label="Email" 
                            type="text"
                            size="small"
                            fullWidth
                            variant="outlined" 
                            value={email}
                            onChange={handleEmailChange}
                            inputRef={focusRef}
                            required 
                 />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <TextField  className={classes.root}
                            id= "Password"
                            label="Password" 
                            type="password"
                            size="small"
                            fullWidth
                            variant="outlined" 
                            value={password}
                            onChange={handlePasswordChange}
                            required />
              </div>
            </div>
            <button className="btn btn-blue mb-2 mt-3 width-complete"
                    data-testid="btn-login"
                    >
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
