import * as Express from "express";
import * as functions from "firebase-functions";
// import { initFirebase } from "./utils/firebase";/
import { routes } from "./routes";
import { triggers } from "./triggers";
// import { firebaseAuth } from "./middleware/firebaseAuth";
import { cors } from "./utils/cors";
import { REGION } from "./const";

routes.forEach((routeObj: any) => {
  const app = Express();

  app.use(cors);

  app.use(routeObj.router);
  exports[routeObj.name] = functions.region(REGION).https.onRequest(app);
});

triggers.forEach((triggerObj: any) => {
  exports[triggerObj.name] = triggerObj.function;
});
