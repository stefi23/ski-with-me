import React from "react"

function Dropbox({ placeholder, value, input, setValue, getListfromDB, setOpenSuggestions, autoCompleteValues, openSuggestions, getSuggestions }) {

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
                {autoCompleteValues.length > 0 && openSuggestions ? (

                    autoCompleteValues.map((autoCompletevalue, index) => (
                        <p
                            key={index}
                            className="autosuggestElement p-2 mb-0"
                            onMouseDown={() =>
                                takeSuggestion(autoCompletevalue[input])}
                            value={autoCompletevalue[input]}
                        >
                            {autoCompletevalue[input]}
                        </p>
                    ))) : null}
            </div>
        </>
    )
}

export default Dropbox