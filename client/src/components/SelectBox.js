import React from 'react'
import { useState, useEffect } from "react"



function SelectBox({ getSelection, label, options, value, id }) {

    useEffect(() => {
        options = [...new Set(options)]
    }, [])

    function valueSelected(e) {
        getSelection(e.target.value)
    }
    return (
        <>
            <select id={id}
                className="form-select"
                onChange={valueSelected} value={value}>
                <option defaultValue="" >{label}</option>
                {options.map((option, index) =>
                    <option value={option} key={index}>{option}</option>
                )}
            </select>
        </>
    )

}

export default SelectBox