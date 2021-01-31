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


function SelectBox({ setValue, getValueSelected, options, value, id, label, autoFocus }) {


    useEffect(() => {
        options = [...new Set(options)]

    }, [])

    function valueSelected(e) {
        getSelection(e.target.value)
    }

    const getSelection = (value) => {
        //pass value to parent component(Search)
        setValue(value)
        //pass the selected value all the way up to parent(App)
        // getValueSelected(value)
    };





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