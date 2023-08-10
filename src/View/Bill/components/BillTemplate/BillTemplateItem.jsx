import { Typography } from "@mui/material";
import React from "react";
import BillTemplateCat from "./BillTemplateCat";
import BillTemplateMain from "./BillTemplateMain";

const BillTemplateItem = ({
  type = "income",
  item = {},
  onShow = null,
  store = {},
}) => {
  return (
    <Typography
      id={`parent_${item.image.slice(0, -4)}_${item.action}`}
      onClick={() => onShow(item?.id)}
      component="li"
      className="bill-template__box"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px 24px",
      }}
    >
      <BillTemplateCat item={item} type={type} />
      <BillTemplateMain item={item} type={type} store={store} />
    </Typography>
  );
};

export default BillTemplateItem;
