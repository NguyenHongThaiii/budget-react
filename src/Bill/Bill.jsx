import { Box } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { handleReturnBudgetByAction } from "../utils";
import BillTemplate from "./components/BillTemplate/BillTemplate";
import ModalBillTemplate from "./components/ModalBillTemplate/ModalBillTemplate";

const Bill = observer(({ store }) => {
  const [budgets, setBudgets] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [budgetId, setBudgetId] = useState("");
  const handleToggleModal = (id) => {
    setBudgetId(id);
    setIsModal((prev) => !prev);
  };
  useEffect(() => {
    store.getBudgetList();
  }, []);

  useEffect(() => {
    setBudgets(JSON.parse(JSON.stringify(store.budgetList)));
  }, [store.budgetList]);

  return (
    <Box
      className="bill"
      id="bill"
      sx={{
        background: "white",
        padding: " 40px 60px",
        display: "flex",
        alignItems: "flex-start",
        gap: "0 60px",
      }}
    >
      <BillTemplate
        budgetList={handleReturnBudgetByAction("income", budgets)}
        type="income"
        onShow={handleToggleModal}
      />
      <BillTemplate
        type="cost"
        onShow={handleToggleModal}
        budgetList={handleReturnBudgetByAction("cost", budgets)}
      />
      {isModal && (
        <ModalBillTemplate
          onShow={() => setIsModal((prev) => !prev)}
          budgetId={budgetId}
          store={store}
        />
      )}
    </Box>
  );
});

export default Bill;
