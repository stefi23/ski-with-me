import React, { useState, useRef } from "react"
import propTypes from 'prop-types';

Dropbox.propTypes = {
    value: propTypes.string.isRequired
}

function Dropbox({ onFilter, onClick, placeholder, data, value }) {
    const [openSuggestions, setOpenSuggestions] = useState(false)
    const [activeSuggestion, setActiveSuggestion] = useState(-1)

    const containerRef = useRef(null);

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            //13 = ENTER KEY
            onFilter(data[activeSuggestion])
            setOpenSuggestions(false)
            setActiveSuggestion(0)

        } else if (e.keyCode === 38) {
            // 38 = ARROW UP
            if (activeSuggestion === 0) {
                return
            }
            setActiveSuggestion(activeSuggestion - 1)

            containerRef.current.children.length &&
                containerRef.current.children[activeSuggestion - 1].scrollIntoView(false);;
        }
        else if (e.keyCode === 40) {
            // 40 = ARROW DOWN
            setOpenSuggestions(true)
            if (activeSuggestion === data.length - 1) {
                return
            }
            setActiveSuggestion(activeSuggestion + 2)
            setActiveSuggestion(activeSuggestion + 1);
            containerRef.current.children.length &&
                containerRef.current.children[activeSuggestion + 1].scrollIntoView(false);

        }
        else if ((e.keyCode === 8 && e.target.value === "") || e.keyCode === 27) {
            setOpenSuggestions(false)
        }
        else {
            setActiveSuggestion(0);
            containerRef.current.children.length &&
                containerRef.current.children[0].scrollIntoView(false);
        }
    }


    return (

        <>
            <label>Which resort?</label>

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
                onKeyDown={((e) => onKeyDown(e))}

            />
            <div>
                <div className="parent">
                    <div className="autocomplete rounded" ref={containerRef}   >

                        {data.length > 0 && openSuggestions ? (

                            data.map((resort, index) => (
                                <p
                                    tabIndex="0"
                                    key={index}
                                    className={index === activeSuggestion ? "autosuggestElement-active p-2 mb-0" : "autosuggestElement p-2 mb-0"}
                                    onMouseDown={() =>
                                        onFilter(resort)
                                    }
                                    onMouseMove={() => setActiveSuggestion(index)}
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