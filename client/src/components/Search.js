import React from "react";
import styled from 'styled-components'
import SelectBox from "./SelectBox"
import { Modal, Button } from "react-bootstrap";

const Title = styled.h1`
        color: #6989af;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align : left;
`;


function Search() {

    const sports = ["ski", "snowboard", "both"]

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-12">
                    <div className="row g-3">
                        <div className="col-md-12">
                            <SelectBox />
                            {/* <label for="inputState" className="form-label">Sport</label>
                            <select id="inputState" className="form-select">
                                <option selected>Choose sport...</option>
                                <option>ski</option>
                                <option>snowboard</option>
                                <option>both</option>
                            </select> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Search