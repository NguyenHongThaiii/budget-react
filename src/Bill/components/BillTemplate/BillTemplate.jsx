import { Box } from "@mui/material";
import React from "react";
import BillTemplateItem from "./BillTemplateItem";

function BillTemplate({ type = "income", onShow = null, budgetList = [] }) {
  return (
    <Box
      component="ul"
      className="bill-template bill-template--income"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "50%",
        padding: 0,
      }}
    >
      <Box
        className="bill-template__title bill--income"
        sx={{
          color: type === "income" ? "#30c4d7" : "#dd80df",
          fontSize: "20px",
          fontWeight: "600",
          margin: "0 0 20px",
        }}
      >
        Income
      </Box>
      {budgetList.map((item, i) => (
        <BillTemplateItem
          type={type}
          item={item}
          key={item.id + i}
          onShow={onShow}
        />
      ))}
    </Box>
  );
}

export default BillTemplate;
