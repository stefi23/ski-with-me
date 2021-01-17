import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

Dropbox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const KEYS = {
  ENTER: 13,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ESCAPE: 27,
  BACKSPACE: 8,
};

/**
 * Dropbox component is a free text input with a list of suggestions
 * @param DropboxProps Properties required by Dropbox
 * @param Dropbox.title A title for the field
 * @param Dropbox.onChange Function called when the written value changes
 * @param Dropbox.value Current selected value
 * @param Dropbox.data Array of strings for suggestions
 */
function Dropbox({ onChange, placeholder, data, title, value }) {
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const containerRef = useRef(null);

  console.log(`Dropbox ${title}`, { data });

  // Filters suggestions based on the current value
  const filteredSuggestions = data.filter((filterValue) => {
    return filterValue.toLowerCase().includes(value.toLowerCase());
  });

  const handleKeyDown = (e) => {
      e.preventDefault();
    switch (e.keyCode) {
      case KEYS.ENTER:
        onChange(data[activeSuggestionIndex]);
        setOpenSuggestions(false);
        setActiveSuggestionIndex(0);
        break;
      case KEYS.ARROW_UP:
        if (activeSuggestionIndex === 0) {
          return;
        }
        setActiveSuggestionIndex(activeSuggestionIndex - 1);

        containerRef.current.children.length &&
          containerRef.current.children[activeSuggestionIndex - 1].scrollIntoView(
            false
          );
        break;
      case KEYS.ARROW_DOWN:
        setOpenSuggestions(true);
        if (activeSuggestionIndex === data.length - 1) {
          return;
        }
        setActiveSuggestionIndex(activeSuggestionIndex + 2);
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
        containerRef.current.children.length &&
          containerRef.current.children[activeSuggestionIndex + 1].scrollIntoView(
            false
          );
        break;
      case KEYS.BACKSPACE:
      case KEYS.ESCAPE:
        if (!e.target.value) {
            setOpenSuggestions(false);
        }
        break;
      default:
        setActiveSuggestionIndex(0);
        containerRef.current.children.length &&
          containerRef.current.children[0].scrollIntoView(false);
    }
  };

  return (
    <>
      <label>Which {title}?</label>
      <input
        className="form-control input"
        type="name"
        name="resorts"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setOpenSuggestions(true);
        }}
        onBlur={() => setOpenSuggestions(false)}
        placeholder={placeholder}
        autoComplete="off"
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div>
        <div className="parent">
          <div className="autocomplete rounded" ref={containerRef}>
            {filteredSuggestions.length > 0 && openSuggestions
              ? filteredSuggestions.map((suggestion, index) => (
                  <p
                    tabIndex="0"
                    key={index}
                    className={
                      index === activeSuggestionIndex
                        ? "autosuggestElement-active p-2 mb-0"
                        : "autosuggestElement p-2 mb-0"
                    }
                    onMouseDown={() => onChange(suggestion)}
                    onMouseMove={() => setActiveSuggestionIndex(index)}
                    value={suggestion}
                  >
                    {suggestion}
                  </p>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dropbox;
