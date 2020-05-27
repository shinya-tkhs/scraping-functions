"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fetch_1 = require("../../services/item/fetch");
const router = express_1.Router();
router.get("/", async (_, res) => {
    const result = await fetch_1.ItemFetchService();
    return res.status(result.status).json(result.data);
});
exports.fetch = {
    name: "fetch__item__list_",
    router
};
//# sourceMappingURL=fetch.js.map