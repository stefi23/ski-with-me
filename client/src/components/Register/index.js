import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import InputBox from "../InputBox"
import RadioBox from "../RadioBox"
import MultipleComponent from "../MultipleInput";
import PropTypes from "prop-types"
import { getResortsListfromDB } from './getResortsListfromDB'
import { getLanguagesListfromDB } from './getLanguagesListfromDB'
import { useInput } from "../../hooks/useInput"
import { addUserInDb }  from './addUser'
import { useArrayState }  from './useArrayState'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import { isNull } from "lodash";


Register.propTypes = {
  intialSkierList: PropTypes.array.isRequired,
  updateLoggedIn: PropTypes.func.isRequired, 
  getName: PropTypes.func.isRequired,
  getUserId:PropTypes.func.isRequired,
}


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
  // const [resorts, addResort, removeResort, editResort] = useArrayState([""]);
  // const [languages, addLanguage, removeLanguage, editLanguage] = useArrayState([""]);
  

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

  useEffect(() => {
    (async () => {
      const resorts = await getResortsListfromDB()
      const languages = await getLanguagesListfromDB()
      setResortsDb(resorts)
      setLanguagesDb(languages)
    })();
    focusRef.current.focus()
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
                {/* <InputBox
                  type="text"
                  label="First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                  ref={focusRef}
                /> */}
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
                {/* <InputBox
                  type="text"
                  label="Last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                /> */}
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
                {/* <InputBox
                  showAlert={showAlert}
                  type="email"
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  message={
                    <div className={showAlert ? "alert-box-absolute" : null}>
                      <p className="mb-0">Email address already registered.</p>
                      <p className="mb-0">Please <Link to="/login" className="text-bordo">
                        <b>login</b>
                      </Link>.</p>
                    </div>
                  }

                  required
                /> */}
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
                {/* <InputBox
                  type="password"
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                /> */}
              </div>

            </div>
            <div className="form-row">
              <div className="form-group col-md-6 mb-0">
                <label className="text-gray">Sport</label>
              </div>
              <div className="form-group col-md-6 mb-0">
                <label className="text-gray">Level</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="form-check form-check-inline">
                  <RadioBox
                    name="sport"
                    label="ski"
                    value="ski"
                    onChange={handleSportChange}
                    defaultChecked={sport === "ski"}
                    id="sport-ski"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <RadioBox
                    name="sport"
                    label="snowboard"
                    value="snowboard"
                    onChange={handleSportChange}
                    defaultChecked={sport === "snowboard"}
                    id="sport-snowboad"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <RadioBox
                    name="sport"
                    label="both"
                    value="both"
                    onChange={handleSportChange}
                    defaultChecked={sport === "both"}
                    id="sport-both" />
                </div>
              </div>
              <div className="form-group col-md-6">
                <div className="form-check form-check-inline">
                  <RadioBox
                    name="level"
                    label="beginner"
                    value="beginner"
                    onChange={handleLevelChange}
                    defaultChecked={level === "beginner"}
                    id="level-beginner"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <RadioBox
                    name="level"
                    label="medium"
                    value="medium"
                    onChange={handleLevelChange}
                    defaultChecked={level === "medium"}
                    id="level-medium" />
                </div>
                <div className="form-check form-check-inline">
                  <RadioBox
                    name="level"
                    label="advanced"
                    value="advanced"
                    onChange={handleLevelChange}
                    defaultChecked={level === "advanced"}
                    id="level-advanced" />
                </div>
                <div className="form-check form-check-inline">
                  <RadioBox
                    name="level"
                    label="pro"
                    value="pro"
                    onChange={handleLevelChange}
                    defaultChecked={level === "pro"}
                    id="level-pro" />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12 mt-3">
                {/* <div className={classes.root}> */}
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
                {/* </div> */}
              </div>
            </div> 

            <div className="form-row">
              <div className="form-group col-md-12 mt-3">
                {/* <div className={classes.root}> */}
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
                {/* </div> */}
              </div>
            </div> 

              {/* <div className="form-group col-md-12">
                <MultipleComponent
                  data={resortsDb}
                  label="Resorts"
                  items={resorts}
                  onAdd={addResort}
                  onRemove={removeResort}
                  onEdit={editResort}
                  required
                />
              </div> */}
            
            
            {/* <div className="form-row">
              <div className="form-group col-md-12">
                <MultipleComponent
                  data={languagesDb}
                  label="Languages"
                  items={languages}
                  onAdd={addLanguage}
                  onRemove={removeLanguage}
                  onEdit={editLanguage}
                  required
                />
              </div>
            </div> */}
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label className="form-check-label">
                  I agree to terms and conditions
                </label>
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
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withRouter(Register);

