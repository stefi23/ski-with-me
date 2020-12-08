import React from "react";

function RadioBox({label,value,onChange}){
    return(
    <> 
        <label 
            className="form-check-label" 
            for="inlineRadio1">{label}
        </label>
            <input
                className="form-check-input"
                type="radio"
                name="sport"
                id="inlineRadio1"
                value="ski"
                // onChange={handleSportChange}
                // defaultChecked={sport === "ski"}
                  />
                  
        </>

       
    )
}


export default RadioBox;


