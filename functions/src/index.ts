import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
// import { initFirebase } from "./utils/firebase";/
import { routes } from "./routes";
import { triggers } from "./triggers";
// import { firebaseAuth } from "./middleware/firebaseAuth";
// import { cors } from "./utils/cors";
import { REGION } from "./const";
import { cors } from "./middleware/cors";

// import * as serviceAccount from "../serviceAccount.json";

admin.initializeApp({
  // credential: admin.credential.cert(JSON.stringify(serviceAccount))
  // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

// admin.initializeApp();

// admin.credential.cert(JSON.stringify(serviceAccount));

routes.forEach((routeObj: any) => {
  const app = express();

  app.use(cors);

  app.use(routeObj.router);
  exports[routeObj.name] = functions.region(REGION).https.onRequest(app);
});

triggers.forEach((triggerObj: any) => {
  exports[triggerObj.name] = triggerObj.function;
});
