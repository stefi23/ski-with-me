import React from "react";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function MultipleComponent({ title, items, onAdd, onRemove, onEdit }) {
  return (
    <div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>{title}</label>
        </div>
      </div>
      {items.map((item, index) => {
        return (
          <div className="form-row" key={index}>
            <div className="form-group col-md-6">
              <input
                value={item}
                className="form-control mb-2"
                onChange={(e) => onEdit(e.target.value,index)}
              />
            </div>
            <div className="form-group col-md-6">
              {items.length < 2 ? null : (
                <button
                  className="btn btn-primary"
                  onClick={() => {onRemove(index)}}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div className="form-row">
        <div className="form-group col-md-12">
          <button
            className="btn btn-primary"
            onClick={() => onAdd("")}
          >
            Add more resorts
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultipleComponent;
