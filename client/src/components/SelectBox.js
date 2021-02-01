import React from 'react'
import { useEffect } from "react"
import PropTypes from "prop-types"

SelectBox.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.object.isRequired,
    autoFocus: PropTypes.bool,
    setValue: PropTypes.func.isRequired,

}


function SelectBox({ setValue, options, value, id, label, autoFocus }) {

    useEffect(() => {
        options = [...new Set(options)]

    }, [])

    function valueSelected(e) {
        setValue(e.target.value)
    }

    return (
        <>
            <label>{`Which ${id}?`}</label>
            <select id={id}
                    autoFocus={autoFocus}
                    className="form-select"
                    onChange={valueSelected} 
                    value={value}
            >   
                <option value={label.value}>{label.text}</option>
                {options.map((option, index) =>
                    <option value={option} key={index}>{option}</option>
                )}
            </select>
        </>
    )

}

export default SelectBox