import * as admin from "firebase-admin";

export const fetchPoll = async (): Promise<any> => {
  const db = admin.firestore();
  const snapshot = await db.collection("poll").get();
  const docs = snapshot.docs;
  const list: any = [];

  docs.forEach(doc => {
    const data = doc.data();
    list.push(data);
  });

  return list;
};
