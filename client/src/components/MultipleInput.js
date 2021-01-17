import React from "react";
import PropTypes from "prop-types";
import Dropbox from "./Dropbox";

MultipleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

/**
 * 
 * @param MultipleComponentProps Properties required by MultipleComponent
 * @param MultipleComponentProps.title A title for the field
 * @param MultipleComponentProps.data A set of data for suggestions
 * @param MultipleComponentProps.selectedValues Values selected by the user
 * @param MultipleComponentProps.onAdd Add value to selectedValues
 * @param MultipleComponentProps.onChange Edit value in selectedValues
 * @param MultipleComponentProps.onRemove Remove value from selectedValues
 */
function MultipleComponent({
  title,
  data,
  selectedValues,
  onAdd,
  onChange,
  onRemove,
}) {
  return (
    <div>
      <label className="text-gray">{title}</label>
      {selectedValues.map((value, index) => {
        return (
          <div key={`multiple-${index}`}>
            <div>
              {data?.length ? ( // We use <Dropbox /> only if we have suggestions data
                <Dropbox
                  title={title}
                  onChange={(value) => {
                    onChange(value, index);
                  }}
                  value={value}
                  placeholder={`Choose ${title}`}
                  suggestions={data}
                />
              ) : (
                <input
                  value={value}
                  className="form-control mb-2"
                  onChange={(e) => onChange(e.target.value, index)}
                />
              )}
            </div>
            <div className="">
              {selectedValues.length < 2 ? null : (
                <button
                  type="button"
                  className="btn btn-blue"
                  onClick={() => {
                    onRemove(index);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div className="mt-2">
        <div className="form-group">
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => onAdd("")}
          >
            Add more {title}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultipleComponent;
