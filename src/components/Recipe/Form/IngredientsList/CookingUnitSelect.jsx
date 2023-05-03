import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
// import { v4 as uuidv4 } from "uuid";
import {
  standardFormUnits,
  standardFormUnitsPlural,
} from "../../../../utils/cookingUnit";
import "./CookingUnitSelect.css";

export default function CookingUnitSelect({ unit }) {
  return (
    // <select
    //   className="ingredient-unit-select"
    //   name="ingredient-unit"
    //   title="Unit"
    //   defaultValue={unit}
    // >
    <div className="ingredient-unit-select-wrapper">
      <TextField
        select
        size="small"
        label="Unit"
        name="ingredient-unit"
        defaultValue={unit}
        fullWidth
      >
        {["", ...standardFormUnits].map((el) => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
          // <option value={el} key={uuidv4()}>
          //   {el}
          // </option>
        ))}
      </TextField>
    </div>
    // </select>
  );
}

CookingUnitSelect.propTypes = {
  unit: PropTypes.oneOf(["", ...standardFormUnits, ...standardFormUnitsPlural])
    .isRequired,
};
