import React from 'react'
import { useState, useEffect } from "react"



function SelectBox({ getSelection, options, value, id, label, autoFocus }) {


    useEffect(() => {
        options = [...new Set(options)]
    }, [])

    function valueSelected(e) {
        getSelection(e.target.value)
    }
    return (
        <>
            <label>{label.text}</label>
            <select id={id}
                autoFocus={autoFocus}
                className="form-select"
                onChange={valueSelected} value={value}>
                <option value={label.value}>{label.text}</option>
                {options.map((option, index) =>
                    <option value={option} key={index}>{option}</option>
                )}
            </select>
        </>
    )

}

export default SelectBox