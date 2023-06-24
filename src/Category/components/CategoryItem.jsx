import { Box, Typography } from "@mui/material";
import React from "react";

function CategoryItem({ cat = {}, onShow = null }) {
  return (
    <Typography
      onClick={() => onShow(cat)}
      component="li"
      sx={{
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s linear",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Box
        sx={{
          padding: "20px",
          width: 50,
          height: 50,
          borderRadius: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "5px solid #dd80df",
          mb: 1,
          transition: "all 0.1s linear",
        }}
      >
        <Box
          component="img"
          src={`./img/${cat?.image}`}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            maxWidth: 50,
          }}
        />
      </Box>
      <Typography component="p" sx={{ fontWeight: "normal", fontSize: 18 }}>
        {cat?.name}
      </Typography>
    </Typography>
  );
}

export default CategoryItem;
