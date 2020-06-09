import React from "react";

function MultipleComponent({ title, items, onChange }) {
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
                onChange={(e) =>
                  onChange(
                    items.map((item, indexToMatch) => {
                      if (index === indexToMatch) {
                        return e.target.value;
                      }
                      return item;
                    })
                  )
                }
              />
            </div>
            <div className="form-group col-md-6">
              {items.length < 2 ? null : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onChange(
                      items.filter((item, indexToMatch) => {
                        if (index === indexToMatch) {
                          return false;
                        } else {
                          return true;
                        }
                      })
                    );
                  }}
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
            onClick={() => onChange([...items, ""])}
          >
            Add more resorts
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultipleComponent;
