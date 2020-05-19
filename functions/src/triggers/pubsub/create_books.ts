import * as functions from "firebase-functions";
import { scrapeBooks } from "../../puppeteer";

const REGION = "asia-northeast1";

const trigger = functions
  .region(REGION)
  .runWith({
    timeoutSeconds: 300,
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

export const createItems: any = {
  // triggerの場合は関数名のprefixを指定する
  name: "create__item__trigger",
  function: trigger
};
