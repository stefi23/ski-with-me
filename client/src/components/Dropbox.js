import React, { useState } from "react"
import propTypes from 'prop-types';

Dropbox.propTypes = {
    value: propTypes.string.isRequired
}

function Dropbox({ onFilter, onClick, placeholder, data, value }) {
    const [openSuggestions, setOpenSuggestions] = useState(false)

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
                onFocus={() => setOpenSuggestions(true)}
                onBlur={() => setOpenSuggestions(false)}
                placeholder={placeholder}
                onKeyUp={(e) => onFilter(e.target.value)}
                autoComplete="off"

            />
            <div class="parent">
                <div className="autocomplete rounded">
                    {data.length > 0 && openSuggestions ? (

                        data.map((resort, index) => (
                            <p
                                key={index}
                                className="autosuggestElement p-2 mb-0"
                                onMouseDown={() =>
                                    onFilter(resort)
                                }
                                value={resort}
                            >
                                {resort}
                            </p>
                        )))

                        : null
                    }
                </div>
            </div>
        </>
    )
}
export default Dropbox