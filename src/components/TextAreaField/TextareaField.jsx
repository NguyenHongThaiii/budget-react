import { Textarea } from "@mui/joy";
import { Typography } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

TextareaField.propTypes = {};

function TextareaField({
  name = "",
  placeholder = "",
  className = "",
  control = null,
}) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <>
      <Textarea
        className={className}
        name={name}
        placeholder={placeholder}
        sx={{ padding: "6px 12px", minHeight: "200px" }}
        size="md"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        error={invalid}
      />
      {error?.message && (
        <Typography
          sx={{ color: "#d32f2f", fontSize: 12, mt: 1, fontWeight: "normal" }}
        >
          {error.message}
        </Typography>
      )}
    </>
  );
}

export default TextareaField;
