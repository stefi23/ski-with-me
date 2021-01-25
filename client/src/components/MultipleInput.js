import React from "react";
import PropTypes from "prop-types"

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

MultipleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}
const data = ["Andorra", "Sinaia", "Predeal", "Azuga", "Poiana Brasov"]

// const data = []



function MultipleComponent({ title, items, onAdd, onRemove, onEdit }) {

  return (
    <div>
      <label className="text-gray">{title}</label>
      {items.map((item, index) => {
        return (
          <div key={index}>

            <div>
              {data?.length ? ( // We use <Dropbox /> only if we have suggestions data
                <Autocomplete
                  classes={{ outline: 'my-class-name' }}
                  onChange={(e, value) => onEdit(value, index)}
                  fullWidth
                  freeSolo
                  // id="combo-box-demo"
                  options={data}
                  getOptionLabel={(option) => option}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params}
                      // label={title}

                      variant="outlined"
                      size="small"
                      margin="normal"
                    />

                  )}
                />
              ) : (
                  <input
                    value={item}
                    className="form-control mb-2"
                    onChange={(e) => onEdit(e.target.value, index)}

                  />
                )}
            </div>
            {/* <div >
              <input
                value={item}
                className="form-control mb-2"
                onChange={(e) => onEdit(e.target.value, index)}

              />
            </div> */}
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
