import { Box } from "@mui/material";
import SelectField from "@views/components/SelectField/SelectField";
import TypographyCustom from "@views/components/TypographyCustom/TypographyCustom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BillTemplateItem from "./BillTemplateItem";
const options = [
  {
    value: "date?asc",
    label: "Date asc",
  },
  {
    value: "date?desc",
    label: "Date desc",
  },
  {
    value: "head?asc",
    label: "Name A-Z",
  },
  {
    value: "head?desc",
    label: "Name Z-A",
  },
  {
    value: "amount?asc",
    label: "Spending asc",
  },
  {
    value: "amount?desc",
    label: "Spending desc",
  },
  {
    value: "none",
    label: "None",
  },
];

const BillTemplate = ({ type = "income", onShow = null, store = {} }) => {
  const [budgets, setBudgets] = useState([]);
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      sort: "",
    },
  });
  const onSubmit = async (data) => {
    const newData = data.sort.split("?");
    const budgetData = await store.sortBudgetListByAtt(
      newData[0],
      newData[1],
      type
    );
    setBudgets(budgetData);
  };
  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };
  useEffect(() => {
    (async () => {
      const budgetData = await store.sortBudgetListByAtt("none", "none", type);
      setBudgets(budgetData);
    })();
  }, [store.budgetParents]);
  return (
    <Box
      component="ul"
      className="bill-template bill-template--income"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "50%",
        padding: 0,
      }}
    >
      <TypographyCustom
        type={type}
        customSx={{
          fontSize: "20px",
          fontWeight: "600",
          margin: "0 0 20px",
          textTransform: "capitalize",
        }}
      >
        {type}
      </TypographyCustom>
      {budgets.length !== 0 && (
        <Box component="form" onSubmit={handleFormSubmit}>
          <SelectField
            onChangeCustom={handleFormSubmit}
            control={control}
            label="Sort"
            name="sort"
            options={options}
          />
        </Box>
      )}
      {budgets.map((item, i) => (
        <BillTemplateItem
          type={type}
          item={item}
          key={item.id + i}
          onShow={onShow}
          store={store}
        />
      ))}
    </Box>
  );
};

export default BillTemplate;
