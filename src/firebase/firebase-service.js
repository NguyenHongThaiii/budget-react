import { getDocs, orderBy, query, where } from "firebase/firestore";

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
