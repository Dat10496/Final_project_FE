import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { sortItemsByPrice } from "../../features/item/itemSlice";

export default function FRadioGroup({
  value,
  label,
  name,
  defaultValue,
  options,
  ...other
}) {
  const dispatch = useDispatch();

  const handleSelectOption = (option) => {
    dispatch(sortItemsByPrice({ option }));
  };

  return (
    <FormControl>
      <RadioGroup defaultValue={defaultValue} name={name} {...other}>
        {options.map((option, index) => (
          <FormControlLabel
            onClick={() => handleSelectOption(option)}
            key={option}
            value={option}
            control={<Radio />}
            label={label.length ? label[index] : option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
