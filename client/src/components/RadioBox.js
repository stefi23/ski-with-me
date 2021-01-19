import React from "react";
import PropTypes from "prop-types"

RadioBox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultChecked: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired

}

function RadioBox({ label, value, onChange, defaultChecked, id, name }) {
    return (
        <>
            <input
                className="form-check-input"
                type="radio"
                name={name}
                id="inlineRadio1"
                value={value}
                onChange={onChange}
                defaultChecked={defaultChecked}
                id={id}
            />
            <label className="text-gray form-check-label" htmlFor={id}>
                {label}
            </label>
        </>


    )
}


export default RadioBox;


