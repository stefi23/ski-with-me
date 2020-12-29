import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox"
import styled from 'styled-components'


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

    const getSportSearched = (sport) => {
        setSport(sport)
        props.getSportSearched(sport)
    };

    const getLevelSearched = (level) => {
        setLevel(level)
        // props.getSportSearched(sport) //data to parent
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
                    </div>
                </div>
            </div>

        </>
    )
}

export default Search