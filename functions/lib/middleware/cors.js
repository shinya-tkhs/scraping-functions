"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cors = require("cors");
const options = {
    methods: "GET,OPTIONS,POST,DELETE,HEAD,PATCH,PUT",
    preflightContinue: false
};
exports.cors = Cors(options);
//# sourceMappingURL=cors.js.map