import { Box, Typography } from "@mui/material";
import { formatRelativeTime, handleTotalEachBudget } from "@utils";
import TypographyCustom from "@views/components/TypographyCustom/TypographyCustom";
import PropTypes from "prop-types";
import React from "react";

BillTemplateMain.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
  store: PropTypes.object,
};

function BillTemplateMain({ item = {}, type = "income", store = {} }) {
  return (
    <Box
      className="bill-template__content"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        color: "#000",
      }}
    >
      <TypographyCustom
        component="p"
        type={type}
        customSx={{ fontSize: "20px", fontWeight: "600" }}
      >
        {item?.head}
      </TypographyCustom>
      <Typography
        component="p"
        className="bill-template__price"
        sx={{
          fontWeight: 550,
        }}
      >
        {type === "cost" ? "-" : ""}${handleTotalEachBudget(store, item)}
      </Typography>
      <Typography
        component="p"
        className="bill-template__time"
        sx={{
          fontSize: 14,
        }}
      >
        Created at:{" "}
        <Typography component="span" className="bill-template__date">
          {formatRelativeTime(item?.date)}
        </Typography>
      </Typography>
    </Box>
  );
}

export default BillTemplateMain;
