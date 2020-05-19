"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const functions = require("firebase-functions");
// import { initFirebase } from "./utils/firebase";/
const routes_1 = require("./routes");
const triggers_1 = require("./triggers");
// import { firebaseAuth } from "./middleware/firebaseAuth";
const cors_1 = require("./utils/cors");
const const_1 = require("./const");
routes_1.routes.forEach((routeObj) => {
    const app = Express();
    app.use(cors_1.cors);
    app.use(routeObj.router);
    exports[routeObj.name] = functions.region(const_1.REGION).https.onRequest(app);
});
triggers_1.triggers.forEach((triggerObj) => {
    exports[triggerObj.name] = triggerObj.function;
});
//# sourceMappingURL=index.js.map