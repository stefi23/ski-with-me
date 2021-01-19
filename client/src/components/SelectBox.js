import React from 'react'
import { useEffect } from "react"
import PropTypes from "prop-types"

SelectBox.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.object.isRequired,
    autoFocus: PropTypes.bool

}


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