import React from "react"

function Dropbox({placeholder, value, setValue, getListfromDB, setOpenSuggestions, autoCompleteValues, openSuggestions,  getSuggestions}){
    console.log("thos", autoCompleteValues)

  const autocompleteSuggestions = () => {
        getSuggestions()
    }

      const takeSuggestion = (suggestion) => {
        setValue(suggestion)
    }

return (
    <>
     <input
                                className="form-control"
                                type="name"
                                name="resorts"
                                value={value}
                                onChange={((e) => setValue(e.target.value))}
                                onClick={getListfromDB}
                                onFocus={() => setOpenSuggestions(true)}
                                onBlur={() => setOpenSuggestions(false)}
                                placeholder={placeholder}
                                onKeyUp={autocompleteSuggestions} // autocomplete-> fetch data and update the 
                                autoComplete="off"
                            />
                            <div className=" autocomplete rounded">
                                {autoCompleteValues.length > 0  && openSuggestions ? (

                                    autoCompleteValues.map((value, index) => (
                                        <p
                                            key={index}
                                            className="autosuggestElement p-2 mb-0"
                                           onMouseDown={() =>
                                               takeSuggestion(value.resort_name)}
                                            value={value.resort_name}
                                        >
                                            {value.resort_name}
                                        </p>
                                    ))) : null}
                            </div>
    </>
)
}

export default Dropbox