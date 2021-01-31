import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox"
import styled from 'styled-components'
import Dropbox from "./Dropbox"
import { useLocation, useHistory } from "react-router-dom"
import PropTypes from "prop-types"

Search.propTypes = {
    intialSkierList: PropTypes.array.isRequired,
    skierListData: PropTypes.array.isRequired,
    getLanguageSearched: PropTypes.func.isRequired,
    getLevelSearched: PropTypes.func.isRequired,
    getResortSearched:  PropTypes.func.isRequired,
    getSportSearched: PropTypes.func.isRequired,
}

const Title = styled.h1`
        color: #6989af;
        font-size: 30px;
        font-weight: bold;
        margin-top: 15px;
        text-align : left;
`;

const getResortSuggestions = (skierList = [], selectedResort) => {
    if (!skierList) {
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
    console.log("Selected language",selectedLanguage )
    if (!skierList) {
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
    // const [skierData, setSkierData] = useState([])
    // const [intialSkierList, setIntialSkierList] = useState([])


    const [sports, setSports] = useState([])
    const [levels, setLevels] = useState([])

    const [resort, setResort] = useState("")
    // const [resortSuggestions, setResortSuggestions] = useState([])

    const [language, setLanguage] = useState("")
    // const [languageSuggestions, setLanguageSuggestions] = useState([])
    
    // allResorts
    // resortsSuggestion

    let location = useLocation();
    let history = useHistory();

    const resortSuggestions = getResortSuggestions(props.skierListData, resort);
    const languageSuggestions = getLanguagesSuggestions(props.skierListData, language)
    

    useEffect(() => {
        // setSkierData(props.skierListData);
        sportsAvailable(props.skierListData)
        levelAvailable(props.skierListData)
        // setIntialSkierList(props.intialSkierList)
        // resortsAvailable(props.skierListData)
        // languagesAvailable(props.skierListData)
    }, [props.skierListData])

    useEffect(() => {
        const parameters = new URLSearchParams(location.search);
        const sportFilter = parameters.get('sport');
        const levelFilter = parameters.get('level');
        const resortFilter = parameters.get('resort');
        const languageFilter = parameters.get('language');

        //if the filters have been reset - reset also the filters in the app
        props.getResortSearched("")
        props.getLanguageSearched("")
   
        if (sportFilter) {
            setSport(sportFilter)
            props.getSportSearched(sportFilter)
        }
        if (levelFilter) {
            setLevel(levelFilter)
            props.getLevelSearched(levelFilter)
        }
        if (resortFilter) {
            setResort(resortFilter)
            
            if(props.skierListData.length > 0) {
                if (resortSuggestions.includes(resortFilter)) {
                    props.getResortSearched(resortFilter)
                } 
            }
        }
        if (languageFilter) {
            //not working proprely - to check
            setLanguage(languageFilter)
            if (languageSuggestions.includes(languageFilter)) {
                props.getLanguageSearched(languageFilter)
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

    //get all available resorts
    // const resortsAvailable =  (skierData) => {
    //     const resortsArr = skierData.map(skier => {
    //         return skier.resort.split(",")
    //     })
    //     setResortSuggestions([...new Set(resortsArr.flat())])
    // }

    //get all available languagres
    // const languagesAvailable = async (skierData) => {
    //     const languagesArr = skierData.map(skier => {
    //         return skier.languages.split(",")
    //     })
    //     setLanguageSuggestions([...new Set(languagesArr.flat())])
    // }


    //filter sugestion once the user starts typing.
    /* Functions moved to Dropbox
    const resortsSuggestions = (resort) => {
        setResortSuggestions(resortSuggestions.filter(x => x.toLowerCase().includes(resort.toLowerCase())))
        if (((resortSuggestions.filter(resortToFilter => {
            return resortToFilter === resort
        })).length > 0 || resort === "")) {
            props.getResortSearched(resort)

        }
        if (resort === "") {
            resortsAvailable(skierData)
        }
        setResort(resort)
    }

    const languagesSuggestions = (language) => {
        setLanguageSuggestions(languageSuggestions.filter(x => x.toLowerCase().includes(language.toLowerCase())))
        if (((languageSuggestions.filter(languageToFilter => {
            return languageToFilter === language
        })).length > 0 || language === "")) {
            props.getLanguageSearched(language)

        }
        if (language === "") {
            autocompleteLanguages(skierData)
        }
        setLanguage(language)
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
                                getValueSelected={props.getSportSearched}
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
                                getValueSelected={props.getLevelSearched}
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
                                setValueSearched={props.getResortSearched}
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
                                setValueSearched={props.getLanguageSearched}
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