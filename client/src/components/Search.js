import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox"
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
    const [intialSkierList, setIntialSkierList] = useState([])


    //used to send filtered data to the checkbox

    const [sports, setSports] = useState([])
    const [levels, setLevels] = useState([])

    const [resort, setResort] = useState("")
    const [resortSuggestions, setResortSuggestions] = useState([])
    const [openSuggestions, setOpenSuggestions] = useState(false)


    const getSportSearched = (sport) => {
        if (sport !== "All sports...") {
            setSport(sport)
            props.getSportSearched(sport)
        }
        else {
            props.getSportSearched("")
            setSport(sport)
            sportsAvailable(intialSkierList)
        }
    };


    const getLevelSearched = (level) => {
        if (level !== "All levels...") {
            setLevel(level)
            props.getLevelSearched(level) //data to parent
        }
        else {
            props.getLevelSearched("")
            setLevel(level)
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

    const autocompleteResorts = async (queryText) => {
        try {
            const resp = await axios.get(`/AllResorts/${resort}`);
            setResortSuggestions(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    //   const getResortsSuggestions = async () => {
    //         try {
    //             const resp = await axios.get(`/AllResorts/${resort}`);
    //             setResorts(resp.data)
    //         } catch (err) {
    //             // Handle Error Here
    //             console.error(err);
    //         }
    //     };

    const takeSuggestedResort = (resort) => {
        setResort(resort);
        if ((resortSuggestions.filter(x => x.resort_name === resort)).length > 0 || resort === "") {
            props.getResortSearched(resort)
        }
    }

    useEffect(() => {
        setSkierData(props.skierListData);
        sportsAvailable(props.skierListData)
        levelAvailable(props.skierListData)
        setIntialSkierList(props.intialSkierList)
    }, [props.skierListData])


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
                                options={sports}
                                label="All sports..."
                                value={sport}
                                initialData={intialSkierList}
                            />
                        </div>
                        <div className="col-md-12">
                            <SelectBox
                                getSelection={getLevelSearched}
                                id="level"
                                options={levels}
                                label="All levels..."
                                value={level}
                            />
                        </div>
                        <div className="col-md-12">
                            <label>Which resort?</label>
                            <input
                                className="form-control"
                                type="name"
                                name="resorts"
                                value={resort}
                                onChange={((e) => takeSuggestedResort(e.target.value))}
                                onClick={((e) => autocompleteResorts(e.target.value))}
                                onFocus={() => setOpenSuggestions(true)}
                                onBlur={() => setOpenSuggestions(false)}
                                placeholder={"Choose resorts"}
                                onKeyUp={((e) => autocompleteResorts(e.target.value))} // autocomplete-> fetch data and update the 
                                autoComplete="off"
                            />
                            <div className=" autocomplete rounded">
                                {resortSuggestions.length > 0 && openSuggestions ? (

                                    resortSuggestions.map((resort, index) => (
                                        <p
                                            key={index}
                                            className="autosuggestElement p-2 mb-0"
                                            onMouseDown={() =>
                                                takeSuggestedResort(resort.resort_name)}
                                            value={resort.resort_name}
                                        >
                                            {resort.resort_name}
                                        </p>
                                    )))

                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Search