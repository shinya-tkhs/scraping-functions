"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../../repositories/item");
exports.ItemFetchService = async () => {
    try {
        const data = await item_1.fetchItemList();
        return {
            status: 200,
            data
        };
    }
    catch (err) {
        console.error("Failed to fetch item data", err);
        return {
            status: 500,
            data: {
                message: "Failed to fetch item data"
            }
        };
    }
};
//# sourceMappingURL=fetch.js.map