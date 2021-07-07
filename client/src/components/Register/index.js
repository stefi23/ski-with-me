import React, { useState, useEffect, useRef } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types"
import { getResortsListfromDB } from './getResortsListfromDB'
import { getLanguagesListfromDB } from './getLanguagesListfromDB'
import { useInput } from "../../hooks/useInput"
import { addUserInDb }  from './addUser'

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

Register.propTypes = {
  intialSkierList: PropTypes.array.isRequired,
  updateLoggedIn: PropTypes.func.isRequired, 
  getName: PropTypes.func.isRequired,
  getUserId:PropTypes.func.isRequired,
}

const useStylesRadio = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiTypography-root': {
      color: '#495057',
    },
    '& .MuiRadio-colorSecondary.Mui-checked' : {
      color: '#649ccc'
    },
    '&.MuiRadio-root' : {
      color: "rgba(0, 0, 0, 0.4)",
      // "#ced4da"
    },
    '&.MuiIconButton-root:hover' : {
    backgroundColor: 'rgba(100,156,204, 0.06)',
    },
  },
});

const useStylesAutoComplete = makeStyles( (theme) => ({
  root: {
    '& label.Mui-focused': {
      color: '#659CCC',
    },
    '& label.Mui-error': {
      color: '#7F055F',
    },
    '& .MuiInputBase-input': {
      color: '#495057',
    },
    '& .MuiInputBase-input.Mui-error': {
      color: 'red',
    },
    '& .MuiFormHelperText-root.Mui-error' :  {
     color: '#7F055F'
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
      '&.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline' : {
        borderColor: '#7F055F',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#659CCC',
      },
      '& .MuiChip-root' : {
        border: '1px solid #649CCC'
      } 
    },
  },
}));

const useStyles = makeStyles( (theme) => ({
  root: {
    '& label.Mui-focused': {
      color: '#659CCC',
    },
    '& label.Mui-error': {
      color: '#7F055F',
    },
    '& .MuiInputBase-input': {
      color: '#495057',
    },
    '& .MuiInputBase-input.Mui-error': {
      color: 'red',
    },
    '& .MuiFormHelperText-root.Mui-error' :  {
     color: '#7F055F'
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
      '&.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline' : {
        borderColor: '#7F055F',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#659CCC',
      },
    },
  },
}));

function Register({ intialSkierList, updateLoggedIn, getName, getUserId }) {
  const [firstName, handleFirstNameChange] = useInput("")
  const [lastName, handleLastNameChange] = useInput("");

  const [email, setEmail] = useState("");
  const [password, handlePasswordChange] = useInput("");

  const [sport, handleSportChange] = useInput("ski");
  const [level, handleLevelChange] = useInput("medium");

  const [resortsDb, setResortsDb] = useState([])
  const [languagesDb, setLanguagesDb] = useState([])

  const [showAlert, setShowAlert] = useState(false)

  const history = useHistory();

  const focusRef = useRef(null)

  const [languages, setLanguageArr] = useState([])
  const [resorts, setResortArr] = useState([])

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
    try {
      console.log(userData)
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
        }
        catch(err) {
         alert("500 ERROR!")
        }
  };

  const classes = useStyles();
  const classesAutoComplete = useStylesAutoComplete();
  const classesRadio = useStylesRadio()

  useEffect(() => {
    (async () => {
      const resorts = await getResortsListfromDB()
      const languages = await getLanguagesListfromDB()
      setResortsDb(resorts)
      setLanguagesDb(languages)
    })();
    // focusRef.current.focus()
  }, [])

 useEffect(() => {
    if(focusRef.current) {
      focusRef.current.focus()
    }
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
                <TextField  
                            className={classes.root}
                            id= "First name"
                            label="First name" 
                            type="text"
                            size="small"
                            fullWidth
                            variant="outlined" 
                            value={firstName}
                            onChange={handleFirstNameChange}
                            inputRef={focusRef}
                            required 
                 />
              </div>
              <div className="form-group col-md-6">
                <TextField  
                        className={classes.root}
                        id= "Last name"
                        label="Last name" 
                        type="text"
                        size="small"
                        fullWidth
                        variant="outlined" 
                        value={lastName}
                        onChange={handleLastNameChange}
                        required 
                 />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <TextField  
                        className={classes.root}
                        error={showAlert}
                        id= "Email"
                        label="Email" 
                        type="email"
                        size="small"
                        fullWidth
                        variant="outlined" 
                        value={email}
                        onChange={handleEmailChange}
                        helperText= {showAlert ? "Email already registered." : null}
                        required 
                    
                      //ADD ERROR ICON:
                      //   InputProps={{
                      //   endAdornment: (
                      //     showAlert ? (<InputAdornment position="center">
                      //       <p className="mb-0">!!</p>
                      //     </InputAdornment>) : null
                      //   ),
                      //  }}
                      
                 />
              </div>
              <div className="form-group col-md-6">
                <TextField  
                        className={classes.root}
                        id= "Password"
                        label="Password" 
                        type="password"
                        size="small"
                        fullWidth
                        variant="outlined" 
                        value={password}
                        onChange={handlePasswordChange}
                        required 
                 />
              </div>
            </div>
    
            <div className="form-row">
              <div className="form-group col-md-6">
                <FormLabel component="legend" >Sport</FormLabel>
                <RadioGroup  className={classesRadio.root} aria-label="sport" name="sport" value={sport} onChange={handleSportChange} row>
                  <FormControlLabel value="ski" control={<Radio className={classesRadio.root} />} color="primary" label="ski" />
                  <FormControlLabel value="snowboard" control={<Radio  className={classesRadio.root}/>} label="snowboard" />
                  <FormControlLabel value="both" control={<Radio  className={classesRadio.root} />} label="both" />
              </RadioGroup>
              </div>
            
            <div className="form-group col-md-6">
                <FormLabel  component="legend">Level</FormLabel>
                <RadioGroup  className={classesRadio.root} aria-label="level" name="level" value={level} onChange={handleLevelChange} row>
                  <FormControlLabel value="beginner"  control={<Radio className={classesRadio.root} />} label="beginner" />
                  <FormControlLabel value="medium" control={<Radio className={classesRadio.root} />} label="medium" />
                  <FormControlLabel value="advanced" control={<Radio className={classesRadio.root} />} label="advanced" />
                  <FormControlLabel  value="pro" control={<Radio className={classesRadio.root}/>} label="pro" />
              </RadioGroup>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12 mt-3">
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-resorts"
                      options={resortsDb}
                      freeSolo
                      onChange={(e, resort) => { setResortArr(resort)}}
                      required
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params} 
                        variant="outlined" 
                        label="Add Resort/s" 
                        className={classesAutoComplete.root}
                        placeholder="Resort/s that you live closeby"
                        
                        />
                      )}
                      ListboxProps={{
                                        style: {
                                        maxHeight: "160px",
                                        }
                                    }}
                    />
              </div>
            </div> 

            <div className="form-row">
              <div className="form-group col-md-12 mt-3">
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-languages"
                      options={languagesDb}
                      freeSolo
                      onChange={(e, language) => { setLanguageArr(language)}}
                      required
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params} 
                        variant="outlined" 
                        label="Add Language/s" 
                        className={classesAutoComplete.root}
                        placeholder="Language/s that you speak"
                        />
                        )}
                        ListboxProps={{
                                        style: {
                                        maxHeight: "160px",
                                        }
                                    }} 
                    />
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
            <p className='mt-3 '><small>By creating an account, you agree to the Terms of Service. We'll occasionally send you account-related emails.</small></p>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withRouter(Register);

