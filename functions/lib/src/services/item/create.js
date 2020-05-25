"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../../repositories/item");
exports.ItemCreateService = async (data) => {
    try {
        await item_1.createItemList(data);
        return {
            status: 200,
            data: {}
        };
    }
    catch (err) {
        console.error("Failed to save item data to firestore", err);
        return {
            status: 500,
            data: {
                message: "Failed to save item data to firestore"
            }
        };
    }
};
//# sourceMappingURL=create.js.map