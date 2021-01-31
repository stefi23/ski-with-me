import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox"
import styled from 'styled-components'
import Dropbox from "./Dropbox"
import { useLocation, useHistory } from "react-router-dom"
import PropTypes from "prop-types"

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

const getResortSuggestions = (skierList = [], selectedResort) => {
    if (skierList.length === 0) {
        return []
    }

    const resortsArr = skierList.map(skier => {
        return skier.resort.split(",")
    })

    const allResorts = [...new Set(resortsArr.flat())]

    if (selectedResort === '') {
        return allResorts
    }

    return allResorts.filter(item => item.toLowerCase().includes(selectedResort.toLowerCase()))
}

const getLanguagesSuggestions = (skierList =[], selectedLanguage) => {
    if (skierList.length === 0) {
        return []
    }
        const languagesArr = skierList.map(skier => {
        return skier.languages.split(",")
    })

    const allLanguages = [...new Set(languagesArr.flat())]

    if (selectedLanguage === '') {
        return allLanguages
    }

    return allLanguages.filter(item => item.toLowerCase().includes(selectedLanguage.toLowerCase()))
    
}

function Search(props) {
    const [sport, setSport] = useState("")
    const [level, setLevel] = useState("")

    //to remove:
    const [sports, setSports] = useState([])
    const [levels, setLevels] = useState([])
    //end

    const [resort, setResort] = useState("")
    const [language, setLanguage] = useState("")

    let location = useLocation();
    let history = useHistory();

    const resortSuggestions = getResortSuggestions(props.skierListData, resort);
    const languageSuggestions = getLanguagesSuggestions(props.skierListData, language)
    

    useEffect(() => {
        sportsAvailable(props.skierListData)
        levelAvailable(props.skierListData)
    }, [props.skierListData])

    useEffect(() => {
        const parameters = new URLSearchParams(location.search);
        const sportFilter = parameters.get('sport');
        const levelFilter = parameters.get('level');
        const resortFilter = parameters.get('resort');
        const languageFilter = parameters.get('language');

        //if the dropbox content has been cleared - reset also the filters in the app - Parent component
        props.setResortSearched("")
        props.setLanguageSearched("")
   
        if (sportFilter) {
            setSport(sportFilter)
            props.setSportSearched(sportFilter)
        }
        if (levelFilter) {
            setLevel(levelFilter)
            props.setLevelSearched(levelFilter)
        }
        if (resortFilter) {
            setResort(resortFilter)
            
            if(props.skierListData.length > 0) {
                if (resortSuggestions.includes(resortFilter)) {
                    props.setResortSearched(resortFilter)
                } 
            }
        }
        if (languageFilter) {
            setLanguage(languageFilter)
            if (languageSuggestions.includes(languageFilter)) {
                props.setLanguageSearched(languageFilter)
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
        // const queryString = Object.keys(searchQuery).filter(key => searchQuery[key]).map(key => key + '=' + searchQuery[key].replace(/ /g, "+")).join('&');

        history.push(`/?${queryString}`);
    }, [history, sport, level, resort, language])

    //MOVE FUNCTIONS OUTSIDE OF COMPONENT 
    //get all available sports
    const sportsAvailable = (skierData) => {
        const sportsArr = skierData.map(skier => {
            return skier.sport
        })
        setSports([...new Set(sportsArr)])
    };

    //get all available levels
    const levelAvailable = (skierData) => {
        const levelArr = skierData.map(skier => {
            return skier.level
        })
        setLevels([...new Set(levelArr)])
    };
    //end

    /*
    get all available resorts
    const resortsAvailable =  (skierData) => {
        const resortsArr = skierData.map(skier => {
            return skier.resort.split(",")
        })
        setResortSuggestions([...new Set(resortsArr.flat())])
    }

    get all available languagres
    const languagesAvailable = async (skierData) => {
        const languagesArr = skierData.map(skier => {
            return skier.languages.split(",")
        })
        setLanguageSuggestions([...new Set(languagesArr.flat())])
    }
    */

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-12">
                    <div className="row g-3">
                        <div className="col-md-12">
                            <Title>Filter:</Title>
                        </div>
                        <div className="col-md-12">
                            <SelectBox
                                autoFocus
                                // getSelection={getSportSearched} 
                                setValue={setSport}
                                id="sport"
                                options={sports}
                                label={{
                                    text: "All sports..",
                                    value: ""
                                }}
                                value={sport}
                                getValueSelected={props.setSportSearched}
                            />
                        </div>
                        <div className="col-md-12">
                            <SelectBox
                                setValue={setLevel}
                                // getSelection={getLevelSearched}
                                id="level"
                                options={levels}
                                label={{
                                    text: "All levels..",
                                    value: ""
                                }}
                                value={level}
                                getValueSelected={props.setLevelSearched}
                            />
                        </div>
                        <div className="col-md-12">
                            <Dropbox
                                title="resort"
                                // onClick={((e) => resortsAvailable(props.skierListData))}
                                value={resort}
                                placeholder="Choose resort"
                                suggestions={resortSuggestions}
                                setValue={setResort}
                                setValueSearched={props.setResortSearched}
                                // refreshData={((e) => resortsAvailable(props.intialSkierList))}
                            />

                        </div>
                        <div className="col-md-12">
                            <Dropbox
                                title="language"
                                // onClick={((e) => languagesAvailable(props.skierListData))}
                                value={language}
                                placeholder="Choose language"
                                suggestions={languageSuggestions}
                                setValue={setLanguage}
                                setValueSearched={props.setLanguageSearched}
                                // refreshData={((e) => languagesAvailable(props.intialSkierList))} 
                                />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Search