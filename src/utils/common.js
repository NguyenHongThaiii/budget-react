export function handleTotalEachBudget(store, parent) {
  const budgets = JSON.parse(JSON.stringify(store.budgetList));
  const list = budgets?.filter((item) => item?.parentId === parent?.id);
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
export function formatRelativeTime(timestamp) {
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - timestamp;

  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    return "Today";
  } else if (daysDiff === 1) {
    return "Yesterday";
  } else {
    return `${daysDiff} days ago`;
  }
}
