import * as puppeteer from "puppeteer";
// import { ItemCreateService } from "../services/item/create";
// import * as https from "https";
import * as admin from "firebase-admin";

import * as serviceAccount from "../../serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

interface IBookItem {
  url: string;
  imgSrc: string;
}

export async function scrapeBooks() {
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
      await page.goto(
        `http://dain.cocolog-nifty.com/myblog/2020/${currentMonth}/index.html`,
        {
          waitUntil: "load"
        }
      );
    } catch (err) {
      console.error("Puppeteer could not lead to page: ", err);
    }

    // 商品情報を配列の中に入れ込む
    const itemList = await page.evaluate(() => {
      const articles = Array.from(
        document.querySelectorAll(".entry-body-text")
      );

      const getBookItem = (
        imgElem: HTMLImageElement
      ): IBookItem | undefined => {
        const parentElem = imgElem.parentElement as HTMLLinkElement;
        const url: string = parentElem.href;
        const imgSrc = imgElem.src;
        const hasTarget =
          url &&
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
        .map((article: any) => {
          const imgs = Array.from(article.querySelectorAll("img"));
          return imgs
            .map((value: any) => getBookItem(value))
            .filter(value => value);
        })
        .reduce((acc, val) => acc.concat(val), []);
    });

    console.log("itemList", itemList);

    try {
      for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i] as IBookItem;

        if (!item) return;

        await page.goto(item.url, {
          waitUntil: "load",
          timeout: 10000
        });

        const result = await page.evaluate(() => {
          const title =
            document.getElementById("productTitle") &&
            document.getElementById("productTitle")!.textContent;
          const price =
            document.querySelector(".a-color-price") &&
            document.querySelector(".a-color-price")!.textContent;
          const image = (document.querySelector(
            ".frontImage"
          ) as HTMLImageElement)?.src;

          return {
            title,
            price,
            image
          };
        });

        if (result.title) {
          const createItemList = async (data: any): Promise<any> => {
            const db = admin.firestore();
            const itemDoc = db.collection("itemList").doc();
            await itemDoc.set(data);
          };

          const title = result.title?.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
          const price = result.price?.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
          const image = result.image?.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
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
          } catch (err) {
            console.error("Could not post to firestore: ", err);
          }
        }

        await page.goBack();
      }
    } catch (err) {
      console.error(err);
    }
    // }
  }

  await browser.close();
}
scrapeBooks();
