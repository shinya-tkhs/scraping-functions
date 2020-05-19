import * as admin from "firebase-admin";

export const createItemList = async (data: any): Promise<any> => {
  const db = admin.firestore();
  const itemDoc = db.collection("itemList").doc();
  await itemDoc.set(data);
};
