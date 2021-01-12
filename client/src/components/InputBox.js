import React from "react";
import { Link } from "react-router-dom";

function InputBox({ label, type, value, onChange, required, showAlert }) {
    return (

        <>
            <label
                className={showAlert ? "text-bordo" : "text-gray"}>{label}</label>

            <input
                style={{ "border": showAlert ? "#7F055F solid 2px" : null }}
                required={required}
                type={type}
                className="form-control"
                name={value}
                value={value}
                onChange={onChange}

            />
            <div className="parent">
                {
                    showAlert ?
                        (
                            <div className={showAlert ? "alert-box-absolute" : null}>
                                <p className="mb-0">Email address already registered.</p>
                                <p className="mb-0">Please <Link to="/login" className="text-bordo">
                                    <b>login</b>
                                </Link>.</p>
                            </div>) : null
                }
            </div>
        </>


    )
}


export default InputBox;


