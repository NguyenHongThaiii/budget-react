import { Box } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

RadioField.propTypes = {};

function RadioField({
  name = "",
  placeholder = "",
  className = "",
  textLabel = "",
  defaultValue = "",
  htmlFor = "htmlfor",
  control = null,
  checked,
  ...props
}) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
    formState: { isValid, errors },
  } = useController({ name, control, defaultValue: "cost" });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        columnGap: 1,
        alignItems: "center",
      }}
    >
      <input
        type="radio"
        className={htmlFor}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={defaultValue}
        error={value.toString()}
        {...props}
      />
      <label htmlFor={htmlFor} className="label-cost">
        {textLabel}
      </label>
    </Box>
  );
}

export default RadioField;
