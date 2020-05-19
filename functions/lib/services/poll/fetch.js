"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poll_1 = require("../../repositories/poll");
exports.PollFetchService = async () => {
    try {
        const poll = await poll_1.fetchPoll();
        return {
            status: 200,
            data: poll
        };
    }
    catch (err) {
        console.error("failed to fetch polls", err);
        return {
            status: 500,
            data: {
                message: "faild to fetch polls"
            }
        };
    }
};
//# sourceMappingURL=fetch.js.map