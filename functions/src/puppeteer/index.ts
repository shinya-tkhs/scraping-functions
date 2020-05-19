import * as puppeteer from "puppeteer";
// import { ItemCreateService } from "../services/item/create";
// import * as https from "https";
import * as admin from "firebase-admin";

admin.initializeApp();

interface IBookItem {
  url: string;
  imgSrc: string;
}

export async function scrapeBooks() {
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

    const getBookItem = (imgElem: HTMLImageElement): IBookItem | undefined => {
      const parentElem = imgElem.parentElement as HTMLLinkElement;
      const url: string = parentElem.href;
      const imgSrc = imgElem.src;
      const hasTarget = ["amazon", "amzn"].some(
        (value: string): any => url && url.includes(value)
      );

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
          .filter(value => value)[0];
      })
      .filter(value => value);
  });

  console.log("itemList", itemList);

  for (let i = 0; i < itemList.length; i++) {
    const item = itemList[i] as IBookItem;

    if (!item) return;

    await page.goto(item.url, {
      // waitUntil: "domcontentloaded"
      waitUntil: "load",
      timeout: 0
    });

    const result = await page.evaluate(() => {
      const title = document.getElementById("productTitle")?.textContent;
      const price = document.querySelector(".a-color-price")?.textContent;
      const image = (document.querySelector(".frontImage") as HTMLImageElement)
        ?.src;

      return {
        isBookPage: title,
        title,
        price,
        image
      };
    });

    if (result.isBookPage) {
      const createItemList = async (data: any): Promise<any> => {
        const db = admin.firestore();
        const itemDoc = db.collection("itemList").doc();
        await itemDoc.set(data);
      };

      const title = result.title?.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
      const price = result.price?.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
      const image = result.image?.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();

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
scrapeBooks();
