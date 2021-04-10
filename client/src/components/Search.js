import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { useLocation, useHistory } from "react-router-dom"
import PropTypes from "prop-types"

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from '@material-ui/core/styles';

Search.propTypes = {
    intialSkierList: PropTypes.array.isRequired,
    skierListData: PropTypes.array.isRequired,
    setLanguageSearched: PropTypes.func.isRequired,
    setLevelSearched: PropTypes.func.isRequired,
    setResortSearched:  PropTypes.func.isRequired,
    setSportSearched: PropTypes.func.isRequired,
}

const Title = styled.h1`
        color: #6989af;
        font-size: 30px;
        font-weight: bold;
        margin-top: 15px;
        text-align : left;
`;

const useStyles = makeStyles({

  root: {
    "& label.Mui-focused": {
       color: "#659CCC",
    },
    "& .MuiAutocomplete-inputRoot": {
       background:'white',
       color:'black'
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ced4da",
      },
      "&:hover fieldset": {
        borderColor: "#659CCC"
      },
      "&.Mui-focused fieldset": {
        borderColor: `#659CCC`,
      },

    }
  },
});

const getSuggestionsData = (skierList = [], selectedValue, title) => {
    if (skierList.flat().length === 0) {
        return []
    }
    const suggestionsArr = skierList.map(skier => {
    return skier[title].split(",")
    })

    const allSuggestions = [...new Set(suggestionsArr.flat())]
    if (selectedValue === null) {
        return allSuggestions
    }

    return allSuggestions

}

 const getSuggestionsSelectBox = (skierList = [], title) => {
    if (skierList.flat().length === 0 ) {
        return []
    }
    const suggestionsArr = skierList.map(skier => {
        return skier[title]
    })

    const allSuggestions = [...new Set(suggestionsArr)]
    return allSuggestions
};


function Search(props) {
    const [sport, setSport] = useState("")
    const [level, setLevel] = useState("")
    const [resort, setResort] = useState("")
    const [language, setLanguage] = useState("")

    let location = useLocation();
    let history = useHistory();

    const resortsData = getSuggestionsData(props.skierListData, resort, "resort");
    const languagesData = getSuggestionsData(props.skierListData, language, "languages");   


    const classes = useStyles();

    const levels = getSuggestionsSelectBox(props.skierListData, "level")
    const sports = getSuggestionsSelectBox(props.skierListData, "sport")

    useEffect(() => {
        const parameters = new URLSearchParams(location.search);
        const sportFilter = parameters.get('sport');
        const levelFilter = parameters.get('level');
        const resortFilter = parameters.get('resort');
        const languageFilter = parameters.get('language');

        //if the dropbox content has been cleared - reset also the filters in the app - Parent component
        props.setResortSearched("")
        props.setLanguageSearched("")
        props.setSportSearched("")
        props.setLevelSearched("")
   
        if (sportFilter) {
            setSport(sportFilter)
            if (sports.includes(sportFilter)) {
                props.setSportSearched(sportFilter)
            } 
        }
        if (levelFilter) {
            setLevel(levelFilter)
            if (levels.includes(levelFilter)) {
                props.setLevelSearched(levelFilter)
            } 
           
        }
        if (resortFilter) {
            setResort(resortFilter)
            
            if(props.skierListData.length > 0) {
                 if (resortsData.includes(resortFilter)) {
                    props.setResortSearched(resortFilter)
                } 
            }
        }
        if (languageFilter) {
            setLanguage(languageFilter)
            if(props.skierListData.length > 0) {
                 if (languagesData.includes(languageFilter)) {
                    props.setLanguageSearched(languageFilter)
                } 
            }
        }
    
    }, [location, props.skierListData]);

    useEffect(() => {
        const searchQuery = {
            sport,
            level,
            resort,
            language
        }
        const queryString = new URLSearchParams()

        for (const [key, value] of Object.entries(searchQuery)) {
            if (value) {
                queryString.append(key, value)
            }
        }
    history.push(`/?${queryString}`);

    }, [history, sport, level, resort, language])


    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-12">
                    <div className="row g-3">
                        <div className="col-md-12">
                            <Title>Filter:</Title>
                        </div>
                        <div className="col-md-12">

                                <Autocomplete
                                    data-testid='autocomplete'
                                    id="sport"
                                    onChange={(e, value) => { setSport(value)}}
                                    onInputChange={(e, value) => { setSport(value)}}
                                    fullWidth
                                    getOptionSelected={(option, sport) => option === sport}
                                    options={sports}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                        label="Sport"
                                        className={classes.root}
                                        variant="outlined"
                                        size="small"
                                        margin="normal"
                                        />

                                    )}
                                    />

                            {/* <SelectBox
                                autoFocus
                                setValue={setSport}
                                id="sport"
                                options={sports}
                                label={{
                                    text: "All sports",
                                    value: ""
                                }}
                                value={sport}
                                 getValueSelected={props.setSportSearched}
                            /> */}
                        </div>
                        <div className="col-md-12">
                                 <Autocomplete
                                    data-testid='autocomplete'
                                    id="level"
                                    onChange={(e, value) => { setLevel(value)}}
                                    onInputChange={(e, value) => { setLevel(value)}}
                                    fullWidth
                                    getOptionSelected={(option, level) => option === level}
                                    options={levels}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                        label="Level"
                                        className={classes.root}
                                        variant="outlined"
                                        size="small"
                                        margin="normal"
                                        />

                                    )}
                                    />
                            {/* <SelectBox
                                setValue={setLevel}
                                id="level"
                                options={levels}
                                label={{
                                    text: "All levels",
                                    value: ""
                                }}
                                value={level}
                                getValueSelected={props.setLevelSearched}
                                setValue={setLevel}
                            /> */}
                        </div>
                        <div className="col-md-12">
                                <Autocomplete
                                    getOptionSelected={(option, resort) => option === resort}
                                    data-testid='autocomplete'
                                    id="ResortsData"
                                    onChange={(e, value) => { setResort(value)}}
                                    fullWidth
                                    options={resortsData}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                        label="Resort"
                                        className={classes.root}
                                        variant="outlined"
                                        size="small"
                                        margin="normal"
                                        />
                                    )}
                                    ListboxProps={{
                                        style: {
                                        maxHeight: "160px",
                                        }
                                    }}
                                    />

                        </div> 
                        <div className="col-md-12 mb-4">
                                <Autocomplete
                                    data-testid='autocomplete'
                                    id="LanguageData"
                                    onChange={(e, value) => { setLanguage(value)}}
                                    fullWidth
                                    getOptionSelected={(option, language) => option === language}
                                    options={languagesData}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                        label="Language"
                                        className={classes.root}
                                        variant="outlined"
                                        size="small"
                                        margin="normal"
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
                </div>
            </div>
        </>
    )
}

export default Search