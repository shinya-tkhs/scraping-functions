"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fetch_1 = require("../../services/poll/fetch");
const router = express_1.Router();
const handleFetch = async (req, res) => {
    const result = await fetch_1.PollFetchService();
    return res.status(result.status).json(result.data);
};
router.get("/", handleFetch);
exports.fetch = {
    name: "fetch",
    router
};
//# sourceMappingURL=fetch.js.map