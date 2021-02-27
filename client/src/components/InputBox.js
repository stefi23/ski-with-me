import React, {forwardRef} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';




const InputBox = forwardRef(({ label, type, value, onChange, required, showAlert, message  }, ref) => {

    InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    showAlert: PropTypes.bool
}

    return (

        <>
            <label 
                htmlFor={label}
                className={showAlert ? "text-bordo" : "text-gray"}>{label}</label>

            <input
                id={label}
                style={{ "border": showAlert ? "#7F055F solid 2px" : null }}
                required={required}
                type={type}
                className="form-control"
                name={value}
                value={value}
                onChange={onChange}
                ref={ref}
            />
            
                {
                    showAlert ? 
                    <div className="parent">
                        {message}
                    </div> 
                    : null
                }
           
        </>


    )
})


  export default InputBox;


