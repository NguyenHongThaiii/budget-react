// moved on mobx get
export function handleTotalBudget(store) {
  const list = JSON.parse(JSON.stringify(store.budgetList));

  return list.reduce((acc, item) => acc + item?.amount, 0);
}
export function handleTotalBill(store, action) {
  const list = JSON.parse(JSON.stringify(store.budgetList));
  const listBudgetByAction = handleReturnBudgetByAction(action, list);

  return listBudgetByAction.reduce((acc, item) => acc + item?.amount, 0);
}
export const handleReturnBudgetByAction = (action, budgets) => {
  return budgets.filter((budget) => {
    if (budget.action === action) return budget;
  });
};
