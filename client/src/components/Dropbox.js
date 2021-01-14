import React, { useState } from "react"
import propTypes from 'prop-types';

Dropbox.propTypes = {
    value: propTypes.string.isRequired
}

function Dropbox({ onFilter, onClick, placeholder, data, value }) {
    const [openSuggestions, setOpenSuggestions] = useState(false)
    const [activeSuggestion, setActiveSuggestion] = useState(-1)

    const onKeyDown = (e) => {
        // ["Andorra", "La molina", "Azuga", "Poiana brasov", "Predeal", "Sinaia", ""]
        //activeSuggestion = 0


        //     if (e.keyCode === 13) {
        //         this.setState({
        //             activeSuggestion: 0,
        //             showSuggestions: false,
        //             userInput: filteredSuggestions[activeSuggestion]
        //         });
        //     }
        //     // User pressed the up arrow
        //     else if (e.keyCode === 38) {
        //         if (activeSuggestion === 0) {
        //             return;
        //         }

        //         this.setState({ activeSuggestion: activeSuggestion - 1 });
        //     }
        //     // User pressed the down arrow
        //     else if (e.keyCode === 40) {
        //         if (activeSuggestion - 1 === filteredSuggestions.length) {
        //             return;
        //         }

        //         this.setState({ activeSuggestion: activeSuggestion + 1 });
        //     }
        // };

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
        }
        else if (e.keyCode === 40) {
            // 40 = ARROW DOWN
            setOpenSuggestions(true)
            if (activeSuggestion === data.length - 1) {
                return
            }
            setActiveSuggestion(activeSuggestion + 1)

        }
        else if (e.keyCode === 8 && e.target.value === "") {
            setOpenSuggestions(false)
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
                onFocus={() => setOpenSuggestions(true)}
                onBlur={() => setOpenSuggestions(false)}
                placeholder={placeholder}
                onKeyUp={(e) => onFilter(e.target.value)}
                autoComplete="off"
                onKeyDown={((e) => onKeyDown(e))}

            />
            <div class="parent">
                <div className="autocomplete rounded">
                    {data.length > 0 && openSuggestions ? (

                        data.map((resort, index) => (
                            <p
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
        </>
    )
}
export default Dropbox