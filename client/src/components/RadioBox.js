import React from "react";

function RadioBox({label,value,onChange, defaultChecked, id, name}){
    return(
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
        <label className="form-check-label" for={id}>
            {label}
        </label>
        </>

       
    )
}


export default RadioBox;


