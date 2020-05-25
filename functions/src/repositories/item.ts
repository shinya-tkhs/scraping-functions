import * as admin from "firebase-admin";

export const createItemList = async (data: any): Promise<any> => {
  const db = admin.firestore();
  const itemDoc = db.collection("itemList").doc();
  await itemDoc.set(data);
};

export const fetchItemList = async (): Promise<any> => {
  const db = admin.firestore();
  const snapshot = await db.collection("itemList").get();
  return snapshot.docs.map(doc => doc.data());
};
