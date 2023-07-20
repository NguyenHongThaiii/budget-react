import { Typography } from "@mui/material";
import React from "react";

TypographyCustom.propTypes = {};

function TypographyCustom({ type, customSx, ...typographyProps }) {
  const textColor = type === "income" ? "#30c4d7" : "#dd80df";

  return (
    <Typography
      {...typographyProps}
      sx={{
        color: textColor,
        textTransform: "capitalize",
        ...typographyProps.sx,
        ...customSx,
      }}
    >
      {typographyProps.children}
    </Typography>
  );
}

export default TypographyCustom;
