import React from "react";
import PropTypes from "prop-types"

MultipleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

function MultipleComponent({ title, items, onAdd, onRemove, onEdit }) {

  return (
    <div>
      {/* <div className="form-row">
        <div className="form-group col-md-6"> */}
      <label className="text-gray">{title}</label>
      {/* </div>
      </div> */}
      {items.map((item, index) => {
        return (
          <div key={index}>
            <div >
              <input
                value={item}
                className="form-control mb-2"
                onChange={(e) => onEdit(e.target.value, index)}

              />
            </div>
            <div className="">
              {items.length < 2 ? null : (
                <button
                  type="button"
                  className="btn btn-blue"
                  onClick={() => { onRemove(index) }}
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
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13) { }
          // }}
          >
            Add more {title}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultipleComponent;
