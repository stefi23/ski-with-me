import React from 'react'
import { useState, useEffect } from "react"



function SelectBox({ getSelection, label, options, value }) {

    function valueSelected(e) {
        getSelection(e.target.value)
    }
    return (
        <>

            <select id="sport"
                className="form-select"
                onChange={valueSelected} value={value}>
                <option value="" selected>{label}</option>
                {options.map((option, index) =>
                    <option value={option} key={index}>{option}</option>
                )}
            </select>
        </>
    )

}

export default SelectBox