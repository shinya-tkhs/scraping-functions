"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
// import { initFirebase } from "./utils/firebase";/
const routes_1 = require("./routes");
const triggers_1 = require("./triggers");
// import { firebaseAuth } from "./middleware/firebaseAuth";
// import { cors } from "./utils/cors";
const const_1 = require("./const");
const cors_1 = require("./middleware/cors");
const serviceAccount = require("../serviceAccount.json");
admin.initializeApp({
    // credential: admin.credential.cert(JSON.stringify(serviceAccount))
    credential: admin.credential.cert(serviceAccount)
});
// admin.initializeApp();
// admin.credential.cert(JSON.stringify(serviceAccount));
routes_1.routes.forEach((routeObj) => {
    const app = express();
    app.use(cors_1.cors);
    app.use(routeObj.router);
    exports[routeObj.name] = functions.region(const_1.REGION).https.onRequest(app);
});
triggers_1.triggers.forEach((triggerObj) => {
    exports[triggerObj.name] = triggerObj.function;
});
//# sourceMappingURL=index.js.map