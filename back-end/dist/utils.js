"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = exports.getServerTime = void 0;
const cors_1 = __importDefault(require("cors"));
const date_fns_1 = require("date-fns");
const getServerTime = () => {
    return `Server times: ${(0, date_fns_1.format)(new Date(), "d/MM/yyyy - hh:mmaaa")}\n`;
};
exports.getServerTime = getServerTime;
exports.cors = (0, cors_1.default)({
    origin: (origin, callback) => {
        // console.log(origin)
        if (["http://localhost:3000", "http://localhost"].indexOf(origin !== null && origin !== void 0 ? origin : "") !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
});
