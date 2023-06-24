import { addDoc, collection, getDocs } from "firebase/firestore";
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import { db } from "../firebase/firebase-config";
import { handleReturnBudgetByAction } from "../utils/index";
class StoreState {
  budgetList = [];
  categoryList = [];
  colRef = collection(db, "budget-category");
  budgetItemRef = collection(db, "budget-item");
  constructor() {
    makeAutoObservable(this, {
      budgetList: observable,
      categoryList: observable,
      getBudgetList: action,
      getCategoryList: action,
      addBudgetItem: action,
      getTotalBillIncome: computed,
      getTotalBillCost: computed,
      getTotalBudget: computed,
    });
  }
  // Define your observer methods here
  getCategoryList = () => {
    getDocs(this.colRef).then((snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      runInAction(() => {
        this.categoryList = data;
      });
    });
  };

  getBudgetList = (type) => {
    getDocs(this.budgetItemRef).then((snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      runInAction(() => {
        this.budgetList = data;
      });
    });
  };
  addBudgetItem = (formValues, category) => {
    const string = category.name + " " + formValues?.action;
    const obj = {
      ...formValues,
      date: new Date().toString().slice(0, 15),
      categoryId: category?.id,
      head: string,
      image: category?.image,
    };
    addDoc(this.budgetItemRef, obj)
      .then((doc) => {
        runInAction(() => {
          obj.id = doc.id;
          const data = [...this.budgetList, obj];
          this.budgetList = data;
        });
      })
      .catch((error) => console.log(error));
  };

  get getTotalBillIncome() {
    const list = this.budgetList;
    const listBudgetByAction = handleReturnBudgetByAction("income", list);

    return listBudgetByAction.reduce((acc, item) => acc + item?.amount, 0);
  }
  get getTotalBillCost() {
    const list = this.budgetList;
    const listBudgetByAction = handleReturnBudgetByAction("cost", list);
    console.log(listBudgetByAction);
    return listBudgetByAction.reduce((acc, item) => acc + item?.amount, 0);
  }
  get getTotalBudget() {
    return this.budgetList.reduce((acc, item) => {
      if (item.action === "income") return acc + item?.amount;
      else return acc - item?.amount;
    }, 0);
  }
}
export const Store = new StoreState();
