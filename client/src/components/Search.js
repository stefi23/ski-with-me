import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox"
import axios from "axios"



function Search(props) {

    const [sportSearched, setSportSearched] = useState("")

    const getSport = (sport) => {
        console.log(sport);
        setSportSearched(sport)
    };

    const getUsersSportSecific = async () => {
        if (sportSearched) {
            try {
                console.log("here", sportSearched)
                const resp = await axios.get(`/sport/${sportSearched}`);
                console.log(resp.data)
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        }
    };


    useEffect(() => {
        getUsersSportSecific()
    }, [sportSearched]);



    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-12">
                    <div className="row g-3">
                        <div className="col-md-12">
                            <SelectBox getSport={getSport} />
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