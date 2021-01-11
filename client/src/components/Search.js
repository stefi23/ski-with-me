import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox"
import styled from 'styled-components'
import Dropbox from "./Dropbox"
import { useLocation, useHistory } from "react-router-dom"

const Title = styled.h1`
        color: #6989af;
        font-size: 30px;
        font-weight: bold;
        margin-top: 15px;
        text-align : left;
`;

function Search(props) {
    const [sport, setSport] = useState("")
    const [level, setLevel] = useState("")
    const [skierData, setSkierData] = useState([])
    const [intialSkierList, setIntialSkierList] = useState([])

    //used to send filtered data to the checkbox

    const [sports, setSports] = useState([])
    const [levels, setLevels] = useState([])

    const [resort, setResort] = useState("")
    const [resortSuggestions, setResortSuggestions] = useState([])

    const [language, setLanguage] = useState("")
    const [languageSuggestions, setLanguageSuggestions] = useState([])

    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        setSkierData(props.skierListData);
        sportsAvailable(props.skierListData)
        levelAvailable(props.skierListData)
        setIntialSkierList(props.intialSkierList)
    }, [props.skierListData])

    useEffect(() => {

        const parameters = new URLSearchParams(location.search);
        const sportFilter = parameters.get('sport');
        const levelFilter = parameters.get('level');
        const resortFilter = parameters.get('resort');
        if (sportFilter) {
            setSport(sportFilter)
        }
        if (levelFilter) {
            setLevel(levelFilter)
        }
        if (resortFilter) {
            setResort(resortFilter)
        }
    }, [location]);

    useEffect(() => {
        const searchQuery = {
            sport,
            level,
            resort
        }
        const queryString = Object.keys(searchQuery).filter(key => searchQuery[key]).map(key => key + '=' + searchQuery[key]).join('&');
        history.push(`/?${queryString}`);
    }, [sport, level, resort])


    const getSportSearched = (sport) => {
        setSport(sport)
        props.getSportSearched(sport)
        if (sport === "") {
            sportsAvailable(intialSkierList)
        }
    };


    const getLevelSearched = (level) => {
        setLevel(level)
        props.getLevelSearched(level)
        if (level === "") {
            levelAvailable(intialSkierList)
        }
    };

    const sportsAvailable = (skierData) => {
        const sportsArr = skierData.map(skier => {
            return skier.sport
        })
        setSports([...new Set(sportsArr)])
    };


    const levelAvailable = (skierData) => {
        const levelArr = skierData.map(skier => {
            return skier.level
        })
        setLevels([...new Set(levelArr)])
    };

    const autocompleteResorts = async (skierData) => {
        const resortsArr = skierData.map(skier => {
            return skier.resort.split(",")
        })
        setResortSuggestions([...new Set(resortsArr.flat())])
    }

    const autocompleteLanguages = async (skierData) => {
        const languagesArr = skierData.map(skier => {
            return skier.languages.split(",")
        })
        setLanguageSuggestions([...new Set(languagesArr.flat())])
    }


    const resortsSuggestions = (resort) => {
        setResortSuggestions(resortSuggestions.filter(x => x.toLowerCase().includes(resort.toLowerCase())))
        if (((resortSuggestions.filter(resortToFilter => {
            return resortToFilter === resort
        })).length > 0 || resort === "")) {
            props.getResortSearched(resort)

        }
        if (resort === "") {
            autocompleteResorts(skierData)
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
                                getSelection={getSportSearched} // send data to parent
                                id="sport"
                                options={sports}
                                label={{
                                    text: "All sports..",
                                    value: ""
                                }}
                                value={sport}
                                initialData={intialSkierList}
                            />
                        </div>
                        <div className="col-md-12">
                            <SelectBox
                                getSelection={getLevelSearched}
                                id="level"
                                options={levels}
                                label={{
                                    text: "All levels..",
                                    value: ""
                                }}
                                value={level}
                            />
                        </div>
                        <div className="col-md-12">
                            <Dropbox
                                onFilter={(resort) => resortsSuggestions(resort)}
                                onClick={((e) => autocompleteResorts(skierData))}
                                value={resort}
                                placeholder="Choose resort"
                                data={resortSuggestions} />
                        </div>
                        <div className="col-md-12">
                            <Dropbox
                                onFilter={(language) => languagesSuggestions(language)}
                                onClick={((e) => autocompleteLanguages(skierData))}
                                value={language}
                                placeholder="Choose language"
                                data={languageSuggestions} />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Search