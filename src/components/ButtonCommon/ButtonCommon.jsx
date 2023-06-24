import { Button } from "@mui/material";
import React from "react";

ButtonCommon.propTypes = {};

function ButtonCommon({
  text = "Button",
  color = "inherit",
  onShow = null,
  type = "button",
}) {
  return (
    <Button type={type} color={color} variant="contained" onClick={onShow}>
      {text}
    </Button>
  );
}

export default ButtonCommon;
