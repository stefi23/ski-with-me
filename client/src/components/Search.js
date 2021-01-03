import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox"
import Dropbox from "./Dropbox"
import styled from 'styled-components'
import axios from "axios";


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
    //
    const [resort, setResort] = useState("")
    const [resorts, setResorts] = useState([])
    const [showResorts, setShowResorts] = useState(false)

    // 
    const [language, setLanguage] = useState("")
    const [showLanguages, setShowLanguages] = useState(false)
    const [languages, setLanguages] = useState([])

    const getSportSearched = (sport) => {
        setSport(sport)
        props.getSportSearched(sport)
    };


    const getLevelSearched = (level) => {
        setLevel(level)
        props.getLevelSearched(level) //data to parent
    };



    useEffect(() => {
        setSkierData(props.skierListData)
    }, [props.skierListData])

    useEffect(() => {
        if (resort) {
            props.getResortSearched(resort)
        }
        if (language) {
            props.getLanguageSearched(language)
        }

    }, [resort, language])


    const getResortsListfromDB = async () => {
        try {
            const resp = await axios.get('/AllResorts');
            setResorts(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const getLanguagesListfromDB = async () => {
        try {
            const resp = await axios.get('/AllLanguages');
            setLanguages(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const getResortsSuggestions = async () => {
        try {
            const resp = await axios.get(`/AllResorts/${resort}`);
            setResorts(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const getLanguagesSuggestions = async () => {
        try {
            const resp = await axios.get(`/AllLanguages/${language}`);
            setLanguages(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };


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
                                getSelection={getSportSearched} // send data to parent
                                id="sport"
                                options={

                                    skierData.map(skier => {
                                        return skier.sport
                                    })
                                }

                                label="Choose sport..."
                                value={sport}
                            />
                        </div>
                        <div className="col-md-12">
                            <SelectBox
                                getSelection={getLevelSearched}
                                id="level"
                                options={skierData.map(skier => {
                                    return skier.level
                                })
                                }
                                label="Choose level..."
                                value={level}
                            />
                        </div>
                        <div className="col-12">
                            <Dropbox value={resort}
                                input="resort_name"
                                setValue={setResort}
                                placeholder={"Which resort?"}
                                getListfromDB={
                                    skierData.resorts

                                }
                                getSuggestions={getResortsSuggestions} //move to Dropbox
                                autoCompleteValues={resorts} //move to Dropbox
                                setAutocompleteValues={setResorts} //move to Dropbox
                                setOpenSuggestions={setShowResorts}
                                openSuggestions={showResorts}
                            />
                        </div>
                        <div className="col-12">
                            <Dropbox value={language}
                                input="language"
                                setValue={setLanguage}
                                placeholder={"Speaks?"}
                                getListfromDB={getLanguagesListfromDB}
                                getSuggestions={getLanguagesSuggestions} //move to Dropbox
                                autoCompleteValues={languages} //move to Dropbox
                                setAutocompleteValues={setLanguages} //move to Dropbox
                                setOpenSuggestions={setShowLanguages}
                                openSuggestions={showLanguages}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Search