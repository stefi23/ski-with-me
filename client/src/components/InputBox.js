import React from "react";

function InputBox({ label, type, value, onChange, required }) {
    console.log("req", required)
    return (

        <>
            <label
                className="text-gray">{label}</label>
            <input
                required={required}
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


