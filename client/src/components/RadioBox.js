import React from "react";

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
            />
            <label className="text-gray form-check-label" htmlFor={id}>
                {label}
            </label>
        </>


    )
}


export default RadioBox;


