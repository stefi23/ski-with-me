import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios"


function SelectBox() {

    const [sport, setSport] = useState("")

    function sportSelected(e) {
        setSport(e.target.value);
    }

    const getUsersSportSecific = async () => {
        if (sport) {
            try {
                console.log(sport)
                const resp = await axios.get(`/sport/${sport}`);
                console.log(resp.data)
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        }
    };

    useEffect(() => {
        console.log("useEffect")
        getUsersSportSecific();
    }, [sport])

    return (
        <>
            <label for="inputState" className="form-label">Sport</label>
            <select id="sport" className="form-select"
                onChange={sportSelected} value={sport}>
                <option selected>Choose sport...</option>
                <option value="ski">ski</option>
                <option value="snowboard">snowboard</option>
                <option value="both">both</option>
            </select>
            <p>{sport}</p>
        </>
    )

}

export default SelectBox