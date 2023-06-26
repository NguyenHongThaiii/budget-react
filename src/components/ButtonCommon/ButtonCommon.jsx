import { Button } from "@mui/material";
import React from "react";

ButtonCommon.propTypes = {};

function ButtonCommon({
  text = "Button",
  color = "#fff",
  onShow = null,
  type = "button",
  backgroundColor = "",
  status = "inherit",
  disabled = false,
}) {
  return (
    <Button
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        textTransform: "capitalize",
        transition: "all 0.2s linear",
        "&:hover": {
          backgroundColor: backgroundColor,
          color: color,
          opacity: 0.8,
        },
      }}
      type={type}
      color={status}
      variant="contained"
      onClick={onShow}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

export default ButtonCommon;
