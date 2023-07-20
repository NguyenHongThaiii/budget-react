import { getDocs, orderBy, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

export class FirebaseService {
  async getItemByConditions(
    colRef = "",
    conditions = [],
    orderConditions = []
  ) {
    let q = query(colRef);
    conditions.forEach((condition) => {
      const { field, operand, value } = condition;
      q = query(q, where(field, operand, value));
    });

    orderConditions.forEach((condition) => {
      const { field, value } = condition;
      q = query(q, orderBy(field, value));
    });

    try {
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return data;
    } catch (error) {
      toast(error.message || "Some thing went wrong !");
      console.log(error.message);
    }
  }
}

export const firebaseGetItemByOneCondition = async (
  colRef = null,
  conditions = [],
  orderConditions = []
) => {
  let q = query(colRef);
  conditions.forEach((condition) => {
    const { field, operand, value } = condition;
    q = query(q, where(field, operand, value));
  });

  orderConditions.forEach((condition) => {
    const { field, value } = condition;
    q = query(q, orderBy(field, value));
  });

  try {
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
