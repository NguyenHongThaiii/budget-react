import { Box, Typography } from "@mui/material";
import React from "react";

const Header = ({ getTotalBudget }) => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        backgroundImage: 'url("./img/bg.jpg")',
        backgroundSize: "cover",
        minHeight: "150px",
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: "24px",
          color: "white",
          marginBottom: "12px",
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        Total Budget
      </Typography>
      <Box
        className="header-budget"
        sx={{ minWidth: "100px", textAlign: "center" }}
      >
        <Typography
          component="span"
          sx={{
            outline: "none",
            border: "3px solid #12deff",
            minWidth: 5,
            width: "fit-content",
            minHeight: "60px",
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#12deff",
            fontWeight: "bold",
            fontSize: 34,
            background: "#fff",
          }}
        >
          {getTotalBudget < 0 ? `-$${-getTotalBudget} ` : `$${getTotalBudget}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
