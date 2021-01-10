import React from "react";

function InputBox({ label, type, value, onChange }) {
    return (
        <>
            <label
                className="text-gray">{label}</label>
            <input
                type={type}
                className="form-control"
                name={value}
                value={value}
                onChange={onChange}
            />
        </>


    )
}


export default InputBox;


