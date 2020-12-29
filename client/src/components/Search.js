import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox"
import axios from "axios"



function Search(props) {
    const [sport, setSport] = useState("")

    const getSportSearched = (sport) => {
        setSport(sport)
        props.getSportSearched(sport)
    };


    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-12">
                    <div className="row g-3">
                        <div className="col-md-12">
                            <SelectBox getSelection={getSportSearched}
                                options={["ski", "snowboard", "both"]}
                                label="Choose sport..."
                                value={sport} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Search