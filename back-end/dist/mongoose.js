"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const MONGODB_URL = "mongodb://mongo-db:27017/sample-docker";
// Connect Mongo Database
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const connected = new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        let time = 1;
        while (true) {
            console.log(chalk_1.default.yellow("\nConnecting to Database..."));
            try {
                yield mongoose_1.default.connect(MONGODB_URL);
                console.log(chalk_1.default.hex("#009e00")(`Database Connected Succesfully\n`));
                resolve(true);
                break;
            }
            catch (error) {
                if (time > 50) {
                    console.log(chalk_1.default.red("Database Connection Failed. Exiting..."));
                    process.exit(1);
                }
                else {
                    console.log(chalk_1.default.hex("#ea7b4b")(`Database Connection Failed. Attempting reconnection in ${time}s...\n`));
                    yield new Promise((resolve) => setTimeout(resolve, 1000 * time));
                }
                continue;
            }
            finally {
                time = time + 2;
            }
        }
    }));
    return connected;
});
exports.connectDatabase = connectDatabase;
