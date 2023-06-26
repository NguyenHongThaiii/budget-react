import {
  addDoc,
  collection,
  getDoc,
  getDocs,
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
      getTotalBillIncome: computed,
      getTotalBillCost: computed,
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
    const obj = {
      ...formValues,
      date: new Date().toString().slice(0, 15),
      categoryId: category?.id,
      head: string,
      image: category?.image,
      parentId: parent?.id,
      userId: this.user?.id,
    };
    if (!parent?.id) {
      const data = await this.createBudgetParent(category, formValues, string);
      obj.parentId = data.id;
      this.budgetParents.push(data);
    }
    const doc = await addDoc(this.budgetItemRef, obj);

    obj.id = doc.id;
    const data = [...this.budgetList, obj];
    this.budgetList = data;
    this.budgetParents = [...this.budgetParents];

    // addDoc(this.budgetItemRef, obj)
    //   .then((doc) => {
    //     runInAction(() => {
    //       obj.id = doc.id;
    //       const data = [...this.budgetList, obj];
    //       this.budgetList = data;
    //       this.budgetParents = [...this.budgetParents];
    //     });
    //   })
    //   .catch((error) => console.log(error));
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
      date: new Date().toString().slice(0, 15),
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
    console.log(user);
    this.user = user;
    console.log(this.user.id);
  }
  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }
  get getTotalBillIncome() {
    const list = this.budgetList;
    const listBudgetByAction = handleReturnBudgetByAction("income", list);

    return listBudgetByAction.reduce((acc, item) => acc + item?.amount, 0);
  }
  get getTotalBillCost() {
    const list = this.budgetList;
    const listBudgetByAction = handleReturnBudgetByAction("cost", list);
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
