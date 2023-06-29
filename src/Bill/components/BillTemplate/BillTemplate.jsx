import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BillTemplateItem from "./BillTemplateItem";
import SelectField from "./../../../components/SelectField/SelectField";
import { useForm } from "react-hook-form";
import { handleReturnBudgetByAction } from "../../../utils";
import { observer } from "mobx-react";

const BillTemplate = observer(
  ({ type = "income", onShow = null, store = {} }) => {
    const [budgets, setBudgets] = useState([]);
    const { control, handleSubmit } = useForm({
      mode: "onChange",
      defaultValues: {
        sort: "",
      },
    });
    const onSubmit = async (data) => {
      const newData = data.sort.split("?");
      console.log(data);
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
        const newData = handleReturnBudgetByAction(type, store.budgetParents);
        const budgetData = await store.sortBudgetListByAtt(
          "none",
          "none",
          type
        );
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
        <Box
          className="bill-template__title bill--income"
          sx={{
            color: type === "income" ? "#30c4d7" : "#dd80df",
            fontSize: "20px",
            fontWeight: "600",
            margin: "0 0 20px",
            textTransform: "capitalize",
          }}
        >
          {type}
        </Box>

        {budgets.length !== 0 && (
          <Box component="form" onSubmit={handleFormSubmit}>
            <SelectField
              onChangeCustom={handleFormSubmit}
              control={control}
              label="Sort"
              name="sort"
              options={[
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
              ]}
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
  }
);

export default BillTemplate;
