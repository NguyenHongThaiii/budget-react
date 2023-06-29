import { Box, Typography } from "@mui/material";
import React from "react";
import { formatRelativeTime, handleTotalEachBudget } from "../../../utils";
import { observer } from "mobx-react";

const BillTemplateItem = observer(
  ({ type = "income", item = {}, onShow = null, store = {} }) => {
    return (
      <Typography
        onClick={() => onShow(item?.id)}
        component="li"
        className="bill-template__box"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px 24px",
        }}
      >
        <Box
          className="bill-template__wrap"
          sx={{
            width: "60px",
            height: "60px",
            border:
              type === "income" ? "3px solid #30c4d7" : "3px solid #dd80df",
            padding: "20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <img
            src={`./img/${item?.image}`}
            alt="salary"
            className="bill-template__img"
          />
        </Box>
        <Box
          className="bill-template__content"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            color: "#000",
          }}
        >
          <Typography
            component="p"
            className="bill-template__title bill--income"
            sx={{
              color: type === "income" ? "#30c4d7" : "#dd80df",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {item?.head}
          </Typography>
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
      </Typography>
    );
  }
);

export default BillTemplateItem;
