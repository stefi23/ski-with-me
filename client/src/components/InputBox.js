import React from "react";

function InputBox({label,value,onChange}){
    return(
    <> <label>{label}</label>
            <input
                  type="text"
                  className="form-control"
                  name={value}
                  value={value}
                  onChange={onChange}
                />
        </>

       
    )
}


export default InputBox;


