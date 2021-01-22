import React, { useState, useRef } from "react"
import PropTypes from 'prop-types';


Dropbox.propTypes = {
    value: PropTypes.string.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired
}

const KEYS = {
    ENTER: 13,
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    ESCAPE: 27,
    BACKSPACE: 8
}


function Dropbox({ onFilter, onClick, placeholder, suggestions, value, title }) {
    const [openSuggestions, setOpenSuggestions] = useState(false)
    const [activeSuggestionIndex, setactiveSuggestionIndex] = useState(-1)

    const containerRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.keyCode === KEYS.ENTER) {
            onFilter(suggestions[activeSuggestionIndex])
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
            if (activeSuggestionIndex === suggestions.length - 1) {
                return
            }
            // setactiveSuggestionIndex(activeSuggestionIndex + 2)
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


    return (

        <>
            <label>Which {title}?</label>

            <input
                className="form-control input"
                type="name"
                name="resorts"
                value={value}
                onChange={(e) => onFilter(e.target.value)}
                onClick={onClick}
                onFocus={() => { setOpenSuggestions(true) }}
                onBlur={() => setOpenSuggestions(false)}
                placeholder={placeholder}
                onKeyUp={(e) => onFilter(e.target.value)}
                autoComplete="off"
                onKeyDown={((e) => handleKeyDown(e))}

            />
            <div>
                <div className="parent">
                    <div className="autocomplete rounded" ref={containerRef}   >

                        {suggestions.length > 0 && openSuggestions ? (

                            suggestions.map((resort, index) => (
                                <p
                                    tabIndex="0"
                                    key={index}
                                    className={index === activeSuggestionIndex ? "autosuggestElement-active p-2 mb-0" : "autosuggestElement p-2 mb-0"}
                                    onMouseDown={() =>
                                        onFilter(resort)
                                    }
                                    onMouseMove={() => setactiveSuggestionIndex(index)}
                                    value={resort}
                                >
                                    {resort}
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