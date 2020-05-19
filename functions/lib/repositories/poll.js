"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
exports.fetchPoll = async () => {
    const db = admin.firestore();
    const snapshot = await db.collection("poll").get();
    const docs = snapshot.docs;
    const list = [];
    docs.forEach(doc => {
        const data = doc.data();
        list.push(data);
    });
    return list;
};
//# sourceMappingURL=poll.js.map