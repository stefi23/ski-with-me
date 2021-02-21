import React, { useState, useRef } from "react"
import PropTypes from 'prop-types';


Dropbox.propTypes = {
    value: PropTypes.string.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
}

const KEYS = {
    ENTER: 13,
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    ESCAPE: 27,
    BACKSPACE: 8
}


function Dropbox({ placeholder, suggestions, value, title, setValue }) {
    const [openSuggestions, setOpenSuggestions] = useState(false)
    const [activeSuggestionIndex, setactiveSuggestionIndex] = useState(-1)

    const containerRef = useRef(null);

    const filteredSuggestions = suggestions.filter(suggestion => {
        return suggestion.toLowerCase().includes(value.toLowerCase())
    })

    const handleKeyDown = (e) => {
        if (e.keyCode === KEYS.ENTER) {
            setValue(filteredSuggestions[activeSuggestionIndex])
            setOpenSuggestions(false)
            setactiveSuggestionIndex(0)

        } else if (e.keyCode === KEYS.ARROW_UP) {
            if (activeSuggestionIndex === 0) {
                return
            }
            setactiveSuggestionIndex(activeSuggestionIndex - 1)

            containerRef.current.children.length &&
                containerRef.current.children[activeSuggestionIndex - 1].scrollIntoView(false);;
        }
        else if (e.keyCode === KEYS.ARROW_DOWN) {
            setOpenSuggestions(true)
            if (activeSuggestionIndex === filteredSuggestions.length - 1) {
                return
            }

            setactiveSuggestionIndex(activeSuggestionIndex + 1);
            containerRef.current.children.length &&
                containerRef.current.children[activeSuggestionIndex + 1].scrollIntoView(false);

        }
        else if ((e.keyCode === KEYS.BACKSPACE && e.target.value === "") || e.keyCode === KEYS.ESCAPE) {
            setOpenSuggestions(false)

        }
        else {
            setactiveSuggestionIndex(0);
            containerRef.current.children.length &&
                containerRef.current.children[0].scrollIntoView(false);
        }
        
    }

    // const filterDataSuggestions = (value) => {
    //     setValue(value)
    // }


    return (

        <>
            <label htmlFor={title}>Which {title}?</label>
            <input
                className="form-control input"
                type="name"
                id={title}
                // name="resorts"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={() => setOpenSuggestions(true)}
                onFocus={() => { setOpenSuggestions(true) }}
                onBlur={() => setOpenSuggestions(false)}
                placeholder={placeholder}
                onKeyUp={(e) => setValue(e.target.value)}

                autoComplete="off"
                onKeyDown={((e) => handleKeyDown(e))}


            />
            <div>
                <div className="parent">
                    <div className="autocomplete rounded" ref={containerRef}   >

                        {filteredSuggestions.length > 0 && openSuggestions ? (
                            filteredSuggestions.map((value, index) => (
                                <p
                                    tabIndex="0"
                                    key={index}
                                    className={index === activeSuggestionIndex ? "autosuggestElement-active p-2 mb-0" : "autosuggestElement p-2 mb-0"}
                                    onMouseDown={() => setValue(value)}
                                    onMouseMove={() => setactiveSuggestionIndex(index)}
                                    value={value}
                                >
                                    {value}
                                </p>
                            )))

                            : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dropbox