"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Sets up cat schema
const catSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    cuteness: {
        type: Number,
        required: true,
        max: 10,
        min: 0,
    },
});
// Create Cat Model
const Cat = mongoose_1.default.model("Cat", catSchema);
exports.default = Cat;
