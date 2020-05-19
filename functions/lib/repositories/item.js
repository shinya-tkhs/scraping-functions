"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
exports.createItemList = async (data) => {
    const db = admin.firestore();
    const itemDoc = db.collection("itemList").doc();
    await itemDoc.set(data);
};
//# sourceMappingURL=item.js.map