import React from 'react'
import { useState, useEffect } from "react"



function SelectBox(props) {

    const [sport, setSport] = useState("")

    function sportSelected(e) {
        setSport(e.target.value)
        props.getSportSearched(e.target.value)
    }
    return (
        <>
            <label for="inputState" className="form-label">Sport</label>
            <select id="sport" className="form-select"
                onChange={sportSelected} value={sport}>
                <option value="" selected>Choose sport...</option>
                <option value="ski">ski</option>
                <option value="snowboard">snowboard</option>
                <option value="both">both</option>
            </select>
        </>
    )

}

export default SelectBox