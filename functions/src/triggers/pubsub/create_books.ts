import * as functions from "firebase-functions";
import { IFunction } from "../../interfaces";
import { scrapeBooks } from "../../puppeteer";
import { REGION } from "../../const";

const trigger = functions
  .region(REGION)
  .runWith({
    timeoutSeconds: 500,
    memory: "2GB"
  })
  .pubsub.topic("create-item")
  .onPublish(
    async (_: functions.pubsub.Message, context: functions.EventContext) => {
      console.log("pub/sub published `create-item`: ", context);
      console.log("pub/sub published `create-item`: ", _);

      // run scraping on by puppeteer
      await scrapeBooks();
    }
  );

export const createItems: IFunction = {
  // triggerの場合は関数名のprefixを指定する
  name: "create__item__trigger",
  function: trigger
};
