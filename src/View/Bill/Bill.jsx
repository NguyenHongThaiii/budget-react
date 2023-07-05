import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/context/store-context";
import BillTemplate from "./components/BillTemplate/BillTemplate";
import ModalBillTemplate from "./components/ModalBillTemplate/ModalBillTemplate";

const Bill = ({}) => {
  const store = useStore();
  const [isModal, setIsModal] = useState(false);
  const [parentId, setParentId] = useState("");
  const handleToggleModal = (id) => {
    setParentId(id);
    setIsModal((prev) => !prev);
  };
  useEffect(() => {
    (async () => {
      await store.getBudgetList();
    })();
  }, []);
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
      <BillTemplate type="income" onShow={handleToggleModal} store={store} />
      <BillTemplate type="cost" onShow={handleToggleModal} store={store} />
      {isModal && (
        <ModalBillTemplate
          onShow={() => setIsModal((prev) => !prev)}
          parentId={parentId}
          store={store}
        />
      )}
    </Box>
  );
};

export default Bill;
