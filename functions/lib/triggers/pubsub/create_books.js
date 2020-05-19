"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const puppeteer_1 = require("../../puppeteer");
const REGION = "asia-northeast1";
const trigger = functions
    .region(REGION)
    .runWith({
    timeoutSeconds: 300,
    memory: "2GB"
})
    .pubsub.topic("create-item")
    .onPublish(async (_, context) => {
    console.log("pub/sub published `create-item`: ", context);
    console.log("pub/sub published `create-item`: ", _);
    // run scraping on by puppeteer
    await puppeteer_1.scrapeBooks();
});
exports.createItems = {
    // triggerの場合は関数名のprefixを指定する
    name: "create__item__trigger",
    function: trigger
};
//# sourceMappingURL=create_books.js.map