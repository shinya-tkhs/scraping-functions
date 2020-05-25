"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = require("../../services/item/create");
const router = express_1.Router();
router.put("/", async (req, res) => {
    const data = req.body;
    const result = await create_1.ItemCreateService(data);
    return res.status(result.status).json(result.data);
});
exports.create = {
    name: "create__item__list",
    router
};
//# sourceMappingURL=create.js.map