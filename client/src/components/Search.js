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

const getSuggestionsDropbox = (skierList = [], selectedValue, title) => {
    if (skierList.flat().length === 0) {
        return []
    }
    const suggestionsArr = skierList.map(skier => {
    return skier[title].split(",")
    })

    const allSuggestions = [...new Set(suggestionsArr.flat())]

    if (selectedValue === '') {
        return allSuggestions
    }

    return allSuggestions.filter(item => item.toLowerCase().includes(selectedValue.toLowerCase()))
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

    const resortSuggestions = getSuggestionsDropbox(props.skierListData, resort, "resort");
    const languageSuggestions = getSuggestionsDropbox(props.skierListData, language, "languages")

    const levels = getSuggestionsSelectBox(props.skierListData, "level")
    const sports = getSuggestionsSelectBox(props.skierListData, "sport")

    /*
    useEffect(() => {
        sportsAvailable(props.skierListData)
        levelAvailable(props.skierListData)
    }, [props.skierListData])
    */

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
                            <SelectBox
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
                            />
                        </div>
                        <div className="col-md-12">
                            <SelectBox
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
                            />
                        </div>
                        <div className="col-md-12">
                            <Dropbox
                                title="resort"
                                value={resort}
                                placeholder="Choose resort"
                                suggestions={resortSuggestions}
                                setValue={setResort}
                            />

                        </div>
                        <div className="col-md-12 mb-4">
                            <Dropbox
                                title="language"
                                value={language}
                                placeholder="Choose language"
                                suggestions={languageSuggestions}
                                setValue={setLanguage}
                                />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Search