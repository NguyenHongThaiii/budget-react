import { db } from "@firebase-config";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { AuthService } from "./service/auth-service";
import { StoreService } from "./service/store-service";
class StoreState {
  budgetList = [];
  categoryList = [];
  budgetParents = [];
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Service
  storeService = new StoreService(db);
  authService = new AuthService(db);

  constructor() {
    makeAutoObservable(this, {
      budgetList: observable,
      categoryList: observable,
      budgetParents: observable,
      user: observable,
      getBudgetList: action,
      getCategoryList: action,
      addBudgetItem: action,
      getBudgetItemList: action,
      login: action,
      logout: action,
      getTotalBill: action,
      sortBudgetListByAtt: action,
      getTotalBudget: computed,
    });
  }

  getCategoryList = async () => {
    const data = await this.storeService.getCategoryList();
    this.categoryList = data;
  };

  getBudgetList = async () => {
    this.budgetParents = await this.storeService.getBudgetList(this.user);
  };

  async getBudgetItemList() {
    if (!this.user) return;
    const data = await this.storeService.getBudgetItemList(this.user);

    this.budgetList = data;
  }

  addBudgetItem = async (formValues, category) => {
    const { data, dataParent } = await this.storeService.addBudgetItem(
      formValues,
      category,
      this.user
    );

    this.budgetList = [...this.budgetList, data];
    this.budgetParents = [...this.budgetParents, dataParent];
  };

  async login(email, password) {
    this.user = await this.authService.login(email, password);
    return this.user;
  }
  async logout() {
    this.user = this.authService.logout();
  }
  getTotalBill(parentId, action) {
    const data = this.storeService.getTotalBill(
      this.budgetList,
      action,
      parentId
    );

    return data;
  }

  async sortBudgetListByAtt(name, value, action) {
    const data = await this.storeService.sortBudgetListByAtt(
      name,
      value,
      action,
      this.user
    );
    return data;
  }

  get getTotalBudget() {
    return this.storeService.getTotalBudget(this.budgetList);
  }
}
export const Store = new StoreState();
