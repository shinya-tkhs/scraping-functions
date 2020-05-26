"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
exports.createItemList = async (data) => {
    const db = admin.firestore();
    const itemDoc = db.collection("itemList").doc();
    await itemDoc.set(data);
};
exports.fetchItemList = async () => {
    const db = admin.firestore();
    const snapshot = await db.collection("itemList").get();
    return snapshot.docs.map(doc => doc.data());
};
//# sourceMappingURL=item.js.map