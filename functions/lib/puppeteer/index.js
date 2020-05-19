"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
// import { ItemCreateService } from "../services/item/create";
// import * as https from "https";
const admin = require("firebase-admin");
admin.initializeApp();
async function scrapeBooks() {
    var _a, _b, _c;
    const browser = await puppeteer.launch({
        // args: ["--no-sandbox"]
        headless: false
        // executablePath: "/usr/bin/chromium-browser"
    });
    const page = await browser.newPage();
    console.log(browser.wsEndpoint());
    await page.goto("http://dain.cocolog-nifty.com/myblog/2020/03/index.html", {
        waitUntil: "networkidle2"
    });
    // 商品情報を配列の中に入れ込む
    const itemList = await page.evaluate(() => {
        const articles = Array.from(document.querySelectorAll(".entry-body-text"));
        const getBookItem = (imgElem) => {
            const parentElem = imgElem.parentElement;
            const url = parentElem.href;
            const imgSrc = imgElem.src;
            const hasTarget = ["amazon", "amzn"].some((value) => url && url.includes(value));
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
                .filter(value => value)[0];
        })
            .filter(value => value);
    });
    console.log("itemList", itemList);
    for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        if (!item)
            return;
        await page.goto(item.url, {
            // waitUntil: "domcontentloaded"
            waitUntil: "load",
            timeout: 0
        });
        const result = await page.evaluate(() => {
            var _a, _b, _c;
            const title = (_a = document.getElementById("productTitle")) === null || _a === void 0 ? void 0 : _a.textContent;
            const price = (_b = document.querySelector(".a-color-price")) === null || _b === void 0 ? void 0 : _b.textContent;
            const image = (_c = document.querySelector(".frontImage")) === null || _c === void 0 ? void 0 : _c.src;
            return {
                isBookPage: title,
                title,
                price,
                image
            };
        });
        if (result.isBookPage) {
            const createItemList = async (data) => {
                const db = admin.firestore();
                const itemDoc = db.collection("itemList").doc();
                await itemDoc.set(data);
            };
            const title = (_a = result.title) === null || _a === void 0 ? void 0 : _a.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
            const price = (_b = result.price) === null || _b === void 0 ? void 0 : _b.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
            const image = (_c = result.image) === null || _c === void 0 ? void 0 : _c.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
            console.log(title, price, image);
            createItemList({
                title,
                price,
                image
            });
            // const data = JSON.stringify({
            //   test: 2222
            // });
            // const options = {
            //   port: 443,
            //   path:
            //     "https://us-central1-nuxt-firebase-app-26388.cloudfunctions.net/create__item__list",
            //   method: "PUT",
            //   headers: {
            //     "Content-Type": "application/json",
            //     "Content-Length": data.length
            //   },
            //   data
            // };
            // const req = https.request(options, res => {
            //   console.log(`statusCode: ${res.statusCode}`);
            //   res.on("data", d => {
            //     process.stdout.write(d);
            //   });
            // });
            // req.on("error", error => {
            //   console.error(error);
            // });
            // req.write(data);
            // req.end();
            // ここでCloud Functionsを動かすべき
        }
        await page.goBack();
    }
    await browser.close();
}
exports.scrapeBooks = scrapeBooks;
scrapeBooks();
//# sourceMappingURL=index.js.map