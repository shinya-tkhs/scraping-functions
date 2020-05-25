"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
// import { ItemCreateService } from "../services/item/create";
// import * as https from "https";
const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
async function scrapeBooks() {
    var _a, _b, _c;
    const browser = await puppeteer.launch({
        args: ["--no-sandbox"]
        // headless: false
    });
    const page = await browser.newPage();
    const currentMonthNum = new Date().getMonth() + 1;
    // for (let year = 2020; year < new Date().getFullYear() + 1; year++) {
    for (let month = 3; month < currentMonthNum + 2; month++) {
        const currentMonth = month < 10 ? `0${month}` : `${month}`;
        try {
            await page.goto(`http://dain.cocolog-nifty.com/myblog/2020/${currentMonth}/index.html`, {
                waitUntil: "load"
            });
        }
        catch (err) {
            console.error("Puppeteer could not lead to page: ", err);
        }
        // 商品情報を配列の中に入れ込む
        const itemList = await page.evaluate(() => {
            const articles = Array.from(document.querySelectorAll(".entry-body-text"));
            const getBookItem = (imgElem) => {
                const parentElem = imgElem.parentElement;
                const url = parentElem.href;
                const imgSrc = imgElem.src;
                const hasTarget = url &&
                    (url.includes("amazon") || url.includes("amzon")) &&
                    !url.includes("PSYCHO-PASS");
                return hasTarget
                    ? {
                        url,
                        imgSrc
                    }
                    : undefined;
            };
            return articles
                .map((article) => {
                const imgs = Array.from(article.querySelectorAll("img"));
                return imgs
                    .map((value) => getBookItem(value))
                    .filter(value => value);
            })
                .reduce((acc, val) => acc.concat(val), []);
        });
        console.log("itemList", itemList);
        try {
            for (let i = 0; i < itemList.length; i++) {
                const item = itemList[i];
                if (!item)
                    return;
                await page.goto(item.url, {
                    waitUntil: "load",
                    timeout: 10000
                });
                const result = await page.evaluate(() => {
                    var _a;
                    const title = document.getElementById("productTitle") &&
                        document.getElementById("productTitle").textContent;
                    const price = document.querySelector(".a-color-price") &&
                        document.querySelector(".a-color-price").textContent;
                    const image = (_a = document.querySelector(".frontImage")) === null || _a === void 0 ? void 0 : _a.src;
                    return {
                        title,
                        price,
                        image
                    };
                });
                if (result.title) {
                    const createItemList = async (data) => {
                        const db = admin.firestore();
                        const itemDoc = db.collection("itemList").doc();
                        await itemDoc.set(data);
                    };
                    const title = (_a = result.title) === null || _a === void 0 ? void 0 : _a.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
                    const price = (_b = result.price) === null || _b === void 0 ? void 0 : _b.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
                    const image = (_c = result.image) === null || _c === void 0 ? void 0 : _c.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
                    const url = item.url;
                    console.log(title, price, image, month);
                    try {
                        createItemList({
                            title,
                            price,
                            image,
                            url,
                            month
                        });
                    }
                    catch (err) {
                        console.error("Could not post to firestore: ", err);
                    }
                }
                await page.goBack();
            }
        }
        catch (err) {
            console.error(err);
        }
        // }
    }
    await browser.close();
}
exports.scrapeBooks = scrapeBooks;
scrapeBooks();
//# sourceMappingURL=index.js.map