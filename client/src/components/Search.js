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
    const [resort, setResort] = useState("")
    const [resorts, setResorts] = useState([])
    const [showResorts, setShowResorts] = useState(false)


    const getSportSearched = (sport) => {
        setSport(sport)
        props.getSportSearched(sport)
    };

    const getLevelSearched = (level) => {
        setLevel(level)
        props.getLevelSearched(level) //data to parent
    };


    const getResortsListfromDB = async () => {
        try {
            const resp = await axios.get('/AllResorts');
            setResorts(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
        // setShowResorts(showResorts => !showResorts)
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

    const autocompleteResorts = () => {
        getResortsSuggestions()

    }

    const takeSuggestion = (suggestion) => {
        setResort(suggestion)
    }

    // useEffect(() => {
    //     getResortsListfromDB()
    // }, [resort])

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
                                options={["ski", "snowboard", "both"]}
                                label="Choose sport..."
                                value={sport}
                            />
                        </div>
                        <div className="col-md-12">
                            <SelectBox
                                getSelection={getLevelSearched}
                                id="level"
                                options={["beginner", "medium", "advanced", "pro"]}
                                label="Choose level..."
                                value={level}
                            />
                        </div>
                        <div className="col-12">
                            <input
                                className="form-control"
                                type="name"
                                name="resorts"
                                value={resort}
                                onChange={((e) => setResort(e.target.value))}
                                onClick={getResortsListfromDB}
                                onFocus={() => setShowResorts(true)}
                                onBlur={() => setShowResorts(false)}
                                placeholder="Which resort?"
                                onKeyUp={autocompleteResorts} // autocomplete-> fetch data and update the 
                                autoComplete="off"
                            />
                            <div className=" autocomplete rounded">
                                {resorts.length > 0 && showResorts ? (

                                    resorts.map((resort, index) => (
                                        <p
                                            key={index}
                                            className="autosuggestElement p-2 mb-0"
                                            onMouseOver={() =>
                                                takeSuggestion(resort.resort_name)}
                                            value={resort.resort_name}
                                        >
                                            {resort.resort_name}
                                        </p>
                                    ))) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Search