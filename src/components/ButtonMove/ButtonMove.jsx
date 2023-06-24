import React, { forwardRef } from "react";
import { Typography } from "@mui/material";

const ButtonMove = forwardRef((props, ref = null) => {
  return (
    <Typography
      onClick={() => props.onClick(props.type)}
      ref={ref}
      component="span"
      sx={{
        fontSize: "14px",
        border: "1px solid #67dbea",
        color: "#67dbea",
        borderRadius: "99px",
        padding: "3px 6px",
        background: "#fff",
        cursor: "pointer",
        transition: "all 0.2s linear",
        "&:hover": {
          background: "#67dbea",
          color: "#fff",
        },
      }}
    >
      {props.text}
    </Typography>
  );
});

export default ButtonMove;
