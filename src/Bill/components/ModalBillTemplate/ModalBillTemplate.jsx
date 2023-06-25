import { Box, Button } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import ModalBillItem from "./ModalBillItem";

function ModalBillTemplate({ onShow = null, budgetId = "", store = {} }) {
  const [budgetItem, setBudgetItem] = useState({});
  const budgetItemRef = doc(db, "budget-item", budgetId);
  useEffect(() => {
    getDoc(budgetItemRef).then((doc) => {
      setBudgetItem({ ...doc.data() });
    });
  }, []);
  return (
    <Box
      className="frame"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
      }}
    >
      <Box
        className="frame-body"
        sx={{
          background: "white",
          padding: "32px",
          borderRadius: "6px",
          borderTop:
            budgetItem?.action === "income"
              ? "7px solid #30c4d7"
              : "7px solid #dd80df",
          minWidth: "300px",
        }}
      >
        <Box
          className="frame-body__header"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0 12px",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 600,
            paddingBottom: "20px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Box
            className="frame-body__total"
            sx={{
              padding: "8px",
              border:
                budgetItem?.action === "income"
                  ? "5px solid #30c4d7"
                  : "5px solid #dd80df",
              fontSize: 24,
            }}
          >
            $
            {budgetItem?.action === "income"
              ? store.getTotalBillIncome
              : store.getTotalBillCost}
          </Box>
          <Box className="frame-body__head" sx={{ fontSize: 24 }}>
            {budgetItem?.head}
          </Box>
        </Box>
        <Box
          component="ul"
          className="frame-body__list"
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: 0,
          }}
        >
          <ModalBillItem budgetItem={budgetItem} />
        </Box>
        <Box
          className="frame-body__close"
          sx={{
            "&>button": {
              color: "#fff",
              transition: "all 0.2s linear",
              backgroundColor:
                budgetItem?.action === "income" ? " #30c4d7 " : " #dd80df ",
              textTransform: "capitalize",
              "&:hover": {
                opacity: 0.8,
                backgroundColor: "#30c4d7",
              },
            },
            textAlign: " right",
            marginTop: "30px",
          }}
        >
          <Button variant="contained" size="small" onClick={onShow} sx={{}}>
            Close!
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ModalBillTemplate;
