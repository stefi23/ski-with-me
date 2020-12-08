import React from "react";

function InputBox({title,value,onChange}){
    return(
    <> <label>{title}</label>
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