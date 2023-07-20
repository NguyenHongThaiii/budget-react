import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

BillTemplateCat.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

function BillTemplateCat({ item = {}, type = "income" }) {
  return (
    <Box
      className="bill-template__wrap"
      sx={{
        width: "60px",
        height: "60px",
        border: type === "income" ? "3px solid #30c4d7" : "3px solid #dd80df",
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
  );
}

export default BillTemplateCat;
