import React from "react";
import PropTypes from "prop-types"

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from '@material-ui/core/styles';



MultipleComponent.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  data: PropTypes.array
}

const useStyles = makeStyles({

  root: {
    "& label.Mui-focused": {
      color: "red",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ced4da",
        height: `2.5em`,
        // border: 1px solid #ced4da;
      },
      "&:hover fieldset": {
        borderColor: "#659CCC"
      },
      "&.Mui-focused fieldset": {
        borderColor: `#659CCC`,
        borderWidth: `1px`,
        outline: `none!important`,
        boxShadow: `0 0 0 0.25rem rgba(13,110,253,.25)`
      },

    }
  },
});



function MultipleComponent({ label, items, onAdd, onRemove, onEdit, data }) {
  const classes = useStyles();

  return (
    <div>
      <label htmlFor={label} className="text-gray">{label}</label>
      {items.map((item, index) => {
        return (
          <div key={index}>

            <div>
              {data?.length ? ( // We use <Autocomple /> only if we have suggestions data
                <Autocomplete
                  data-testid='autocomplete'
                  id={label}
                  onChange={(e, value) => {
                    onEdit(value, index)
                  }}
                  onInputChange={(e, value) => {
                    onEdit(value, index)
                  }}
                  fullWidth
                  freeSolo
                  // id="combo-box-demo"
                  options={data}
                  getOptionLabel={(option) => option}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params}
                      // label={title}
                      className={classes.root}
                      variant="outlined"
                      size="small"
                      margin="normal"
                      required
                    />

                  )}
                  ListboxProps={{
                    style: {
                      maxHeight: "160px",
                    }
                  }}
                />
              ) : (
                  <input
                    id={label}
                    value={item}
                    className="form-control mb-2"
                    onChange={(e) => onEdit(e.target.value, index)}
                    required
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
            Add more {label}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultipleComponent;
