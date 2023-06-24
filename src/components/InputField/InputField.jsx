import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

InputField.propTypes = {};

function InputField({
  type = "text",
  name = "",
  placeholder = "",
  className = "",
  control,
}) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
    formState: { isValid, errors },
  } = useController({ name, control });
  return (
    <TextField
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      value={value}
      type={type}
      className={className}
      name={name}
      error={invalid}
      helperText={errors[name]?.message}
      placeholder={placeholder}
      size="small"
    />
  );
}

export default InputField;
