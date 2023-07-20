import { Box, Typography } from "@mui/material";
import { formatRelativeTime } from "@utils";
import React from "react";

function ModalBillItem({ budgetItem = {} }) {
  return (
    <Typography
      component="li"
      className="frame-body__item"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px 24px",
        "&>img": {
          width: "60px",
          height: "60px",
        },
      }}
    >
      <img
        src="./img/calendar.png"
        className="frame-body__calendar"
        alt="calendar"
      />
      <Box
        className="frame-body__content"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <Box className="frame-body__title" sx={{ color: "#000" }}>
          {budgetItem?.title}:{" "}
          <Typography
            component="span"
            className="frame-body__money"
            sx={{
              color: "#dd80df",
              fontWeight: 600,
            }}
          >
            ${budgetItem?.amount}
          </Typography>
        </Box>
        <Box
          className="frame-body__description"
          sx={{
            fontSize: "14px",
            color: "#828282",
          }}
        >
          {budgetItem?.description}
        </Box>
        <Box
          className="frame-body__time"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: "16px",
            color: "#30c4d7",
          }}
        >
          Created at:{" "}
          <Typography
            component="span"
            className="frame-body__date"
            sx={{
              fontWeight: "bold",
              color: "#30c4d7",
            }}
          >
            {formatRelativeTime(budgetItem?.date)}
          </Typography>
        </Box>
      </Box>
    </Typography>
  );
}

export default ModalBillItem;
