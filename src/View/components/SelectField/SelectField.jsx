import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

SelectField.propTypes = {};

function SelectField({
  onChangeCustom = null,
  name = "",
  control,
  options = [],
  label = "",
}) {
  const {
    field,
    fieldState: { invalid, error },
    formState: { isValid, errors },
  } = useController({ name, control });

  const handleSelectChange = (event) => {
    field.onChange(event);
    onChangeCustom(); // Trigger the callback function passed from the parent component
  };
  return (
    <>
      <FormControl fullWidth error={invalid}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId={`${name}_sort`}
          label={label}
          {...field}
          name={name}
          onChange={handleSelectChange}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              name={option.label}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </>
  );
}

export default SelectField;
