import { addDoc, collection, getDoc } from "firebase/firestore";
import {
  NAME_COLLECTION_FIREBASE,
  firebaseGetItemByOneCondition,
  handleReturnBudgetByAction,
} from "../../utils";
import { Service } from "./service";

export class StoreService extends Service {
  catRef;
  budgetItemRef;
  budgetParentRef;
  userRef;
  constructor(db) {
    super(db);
    this.catRef = collection(db, NAME_COLLECTION_FIREBASE.category);
    this.budgetItemRef = collection(db, NAME_COLLECTION_FIREBASE.item);
    this.budgetParentRef = collection(db, NAME_COLLECTION_FIREBASE.parent);
    this.userRef = collection(db, NAME_COLLECTION_FIREBASE.user);
  }

  async getCategoryList() {
    const data = await firebaseGetItemByOneCondition(this.catRef, []);

    return data;
  }
  async getBudgetList(user) {
    if (!user) return;
    const data = await firebaseGetItemByOneCondition(this.budgetParentRef, [
      {
        field: "userId",
        operand: "==",
        value: user?.id,
      },
    ]);
    return data;
  }
  async getBudgetItemList(user) {
    if (!user) return;
    const data = await firebaseGetItemByOneCondition(this.budgetItemRef, [
      {
        field: "userId",
        operand: "==",
        value: user?.id,
      },
    ]);

    return data;
  }
  async addBudgetItem(formValues, category, user) {
    const string = `${category.name} ${formValues?.action}`;
    const parent = await this.getBudgetParentByCondition(
      category?.type,
      formValues?.action,
      user
    );

    let dataParent;
    const tempObj = {
      ...formValues,
      date: new Date().getTime(),
      categoryId: category?.id,
      head: string,
      image: category?.image,
      parentId: parent ? parent?.id : "",
      userId: user?.id,
    };
    if (!parent) {
      dataParent = await this.createBudgetParent(
        formValues,
        category,
        user,
        string
      );
      tempObj.parentId = dataParent.id;
    }
    const doc = await addDoc(this.budgetItemRef, tempObj);
    tempObj.id = doc.id;
    return {
      data: tempObj,
      dataParent,
    };
  }
  async getBudgetParentByCondition(type, action, user) {
    const data = await firebaseGetItemByOneCondition(this.budgetParentRef, [
      {
        field: "type",
        operand: "==",
        value: type,
      },
      {
        field: "action",
        operand: "==",
        value: action,
      },
      {
        field: "userId",
        operand: "==",
        value: user?.id,
      },
    ]);
    return data[0];
  }
  async createBudgetParent(formValues, category, user, string) {
    const obj = {
      action: formValues?.action,
      date: new Date().getTime(),
      categoryId: category?.id,
      head: string,
      image: category?.image,
      type: category?.type,
      userId: user?.id,
    };
    const doc = await addDoc(this.budgetParentRef, obj);
    const docSnapshot = await getDoc(doc);
    const docData = docSnapshot.data();
    return { id: doc.id, ...docData };
  }
  getTotalBill(budgetList, action, parentId) {
    const listBudgetByAction = handleReturnBudgetByAction(action, budgetList);
    const listByParentId = listBudgetByAction?.filter(
      (item) => item?.parentId === parentId
    );
    return listByParentId.reduce((acc, item) => acc + item?.amount, 0);
  }
  getTotalBudget(budgetList) {
    return budgetList.reduce((acc, item) => {
      if (item.action === "income") return acc + item?.amount;
      else return acc - item?.amount;
    }, 0);
  }
  async sortBudgetListByAtt(name, value, action, user) {
    let data;
    if (name == "none")
      data = await firebaseGetItemByOneCondition(
        this.budgetParentRef,
        [
          {
            field: "action",
            operand: "==",
            value: action,
          },
          {
            field: "userId",
            operand: "==",
            value: user?.id,
          },
        ],
        [
          {
            field: "date",
            value: "asc",
          },
        ]
      );
    else if (name == "amount")
      data = await this.fetchAndSortBudgetParents(action, user, value);
    else
      data = await firebaseGetItemByOneCondition(
        this.budgetParentRef,
        [
          {
            field: "action",
            operand: "==",
            value: action,
          },
          {
            field: "userId",
            operand: "==",
            value: user?.id,
          },
        ],
        [
          {
            field: name,
            value: value,
          },
        ]
      );
    return data;
  }
  async getTotalPrice(parentId, user, action) {
    const data = await firebaseGetItemByOneCondition(this.budgetItemRef, [
      {
        field: "parentId",
        operand: "==",
        value: parentId,
      },
      {
        field: "userId",
        operand: "==",
        value: user?.id,
      },
      {
        field: "action",
        operand: "==",
        value: action,
      },
    ]);

    return data.reduce((acc, item) => acc + item?.amount, 0);
  }
  async fetchAndSortBudgetParents(action, user, value) {
    const data = await firebaseGetItemByOneCondition(this.budgetParentRef, [
      {
        field: "action",
        operand: "==",
        value: action,
      },
      {
        field: "userId",
        operand: "==",
        value: user?.id,
      },
    ]);
    const promises = data.map(async (item) => {
      const totalPrice = await this.getTotalPrice(item.id, user, item.action);
      item.totalPrice = totalPrice;
      return item;
    });
    const newData = await Promise.all(promises);

    value === "asc"
      ? newData.sort((a, b) => a.totalPrice - b.totalPrice)
      : newData.sort((a, b) => b.totalPrice - a.totalPrice);

    return newData;
  }
  get getCatRef() {
    return this.catRef;
  }
  get getBudgetItemRef() {
    return this.budgetItemRef;
  }
  get getBudgetParentRef() {
    return this.budgetParentRef;
  }
  get getUserRef() {
    return this.userRef;
  }
}
