"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require("basic-auth");
const functions = require("firebase-functions");
// import { config } from "firebase-functions";
const admin = {
    [functions.config().env.basic_auth.username]: {
        password: functions.config().env.basic_auth.password
    }
};
exports.basicAuth = (req, res, next) => {
    const user = auth(req);
    if (user && admin[user.name] && admin[user.name].password == user.pass) {
        next();
    }
    else {
        res.set("WWW-Authenticate", 'Basic realm="scraper"');
        return res.status(401).send();
    }
};
//# sourceMappingURL=basicAuth.js.map