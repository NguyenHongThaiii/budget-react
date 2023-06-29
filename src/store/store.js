import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { db } from "../firebase/firebase-config";
import { handleReturnBudgetByAction } from "../utils/index";
class StoreState {
  budgetList = [];
  categoryList = [];
  budgetParents = [];
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  colRef = collection(db, "budget-category");
  budgetItemRef = collection(db, "budget-item");
  budgetParentRef = collection(db, "budget-parent");
  userRef = collection(db, "user");
  constructor() {
    makeAutoObservable(this, {
      budgetList: observable,
      categoryList: observable,
      budgetParents: observable,
      user: observable,
      getBudgetList: action,
      getCategoryList: action,
      addBudgetItem: action,
      getBudgetParentByCondition: action,
      getBudgetItemList: action,
      createBudgetParent: action,
      login: action,
      getTotalBill: action,
      getTotalBillCost: action,
      sortBudgetListByAtt: action,
      getTotalBudget: computed,
    });
  }
  // Define your observer methods here
  getCategoryList = async () => {
    const snapshot = await getDocs(this.colRef);
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    this.categoryList = data;
  };

  getBudgetList = async (type) => {
    if (!this.user) return;
    const q = query(this.budgetParentRef, where("userId", "==", this.user?.id));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    this.budgetParents = data;
  };

  async getBudgetItemList() {
    if (!this.user) return;
    const q = query(this.budgetItemRef, where("userId", "==", this.user?.id));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    this.budgetList = data;
  }

  addBudgetItem = async (formValues, category) => {
    const string = category.name + " " + formValues?.action;

    const parent = await this.getBudgetParentByCondition(
      category?.type,
      formValues?.action
    );
    const tempObj = {
      ...formValues,
      date: new Date().getTime(),
      categoryId: category?.id,
      head: string,
      image: category?.image,
      parentId: parent?.id,
      userId: this.user?.id,
    };
    if (!parent?.id) {
      const data = await this.createBudgetParent(category, formValues, string);
      tempObj.parentId = data.id;
      this.budgetParents.push(data);
    }
    const doc = await addDoc(this.budgetItemRef, tempObj);

    tempObj.id = doc.id;
    const data = [...this.budgetList, tempObj];
    this.budgetList = data;
    this.budgetParents = [...this.budgetParents];
  };
  async getBudgetParentByCondition(type, action) {
    const q = query(
      this.budgetParentRef,
      where("type", "==", type),
      where("action", "==", action),
      where("userId", "==", this.user?.id)
    );
    let obj;
    try {
      const snapshot = await getDocs(q);
      snapshot.docs.map((doc) => {
        obj = {
          id: doc.id,
          ...doc.data(),
        };
      });
      return obj;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async createBudgetParent(category, formValues, string) {
    const obj = {
      action: formValues?.action,
      date: new Date().getTime(),
      categoryId: category?.id,
      head: string,
      image: category?.image,
      type: category?.type,
      userId: this.user?.id,
    };
    const doc = await addDoc(this.budgetParentRef, obj);
    const docSnapshot = await getDoc(doc);
    const docData = docSnapshot.data();
    return { id: doc.id, ...docData };
  }
  login(user) {
    this.user = user;
  }
  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }
  getTotalBill(parentId, action) {
    const list = this.budgetList;
    const listBudgetByAction = handleReturnBudgetByAction(action, list);
    const listByParentId = listBudgetByAction?.filter(
      (item) => item?.parentId === parentId
    );
    return listByParentId.reduce((acc, item) => acc + item?.amount, 0);
  }
  getTotalBillCost() {
    const list = this.budgetList;
    const listBudgetByAction = handleReturnBudgetByAction("cost", list);
    return listBudgetByAction.reduce((acc, item) => acc + item?.amount, 0);
  }

  async sortBudgetListByAtt(name, value, action) {
    let q;
    if (name === "none")
      q = query(
        this.budgetParentRef,
        where("action", "==", action),
        where("userId", "==", this.user?.id),
        orderBy("date", "asc")
      );
    else if (name === "amount") {
      return this.fetchAndSortBudgetParents(value, action);
    } else
      q = query(
        this.budgetParentRef,
        where("action", "==", action),
        where("userId", "==", this.user?.id),
        orderBy(name, value)
      );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }
  async getTotalPrice(parentId, action) {
    const q = query(
      this.budgetItemRef,
      where("parentId", "==", parentId),
      where("userId", "==", this.user?.id),
      where("action", "==", action)
    );
    const snapshot = await getDocs(q);

    let totalPrice = 0;
    snapshot.forEach((doc) => {
      const item = doc.data();
      totalPrice += item.amount;
    });

    return totalPrice;
  }

  async fetchAndSortBudgetParents(value, action) {
    const q = query(
      this.budgetParentRef,
      where("action", "==", action),
      where("userId", "==", this.user?.id)
    );
    const snapshot = await getDocs(q);

    const promises = snapshot.docs.map(async (doc) => {
      const parent = doc.data();
      const parentId = doc.id;
      const tempObj = {
        ...parent,
        id: parentId,
      };
      const totalPrice = await this.getTotalPrice(parentId, action);
      tempObj.totalPrice = totalPrice;

      return tempObj;
    });
    const budgetParents = await Promise.all(promises);

    value === "asc"
      ? budgetParents.sort((a, b) => a.totalPrice - b.totalPrice)
      : budgetParents.sort((a, b) => b.totalPrice - a.totalPrice);

    return budgetParents;
  }
  get getTotalBudget() {
    return this.budgetList.reduce((acc, item) => {
      if (item.action === "income") return acc + item?.amount;
      else return acc - item?.amount;
    }, 0);
  }
}
export const Store = new StoreState();
