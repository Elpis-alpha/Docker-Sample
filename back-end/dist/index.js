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
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const faker_1 = require("@faker-js/faker");
const Cat_1 = __importDefault(require("./Cat"));
const mongoose_1 = require("./mongoose");
const PORT = process.env.PORT;
const TASK = process.env.TASK;
if (!PORT) {
    console.log(chalk_1.default.red("No PORT provided"));
    process.exit(1);
}
// Configures the environment variables
dotenv_1.default.config();
// Acquire an instance of Express
const app = (0, express_1.default)();
// Allow incomming incoming cors
app.use(utils_1.cors);
// Parse incoming requests and 20mb limit
app.use(express_1.default.json({ limit: "50mb" }));
// Parse form body and encodes
app.use(express_1.default.urlencoded({ extended: true }));
// Allow home route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Test Docker API", task: TASK });
});
// Allow home route
app.get("/users", (req, res) => {
    res.json({
        message: "success",
        data: [
            { name: "ali", age: 20 },
            { name: "ahmed", age: 22 },
            { name: "mohamed", age: 25 },
            { name: "catherine", age: 30 },
            { name: "sarah", age: 35 },
            { name: "alice", age: 25 },
        ],
    });
});
// Allow home route
app.get("/cats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let i = 0; i < 5; i++) {
            yield Cat_1.default.create({
                name: faker_1.faker.internet.userName(),
                cuteness: faker_1.faker.number.int({ min: 0, max: 10 }),
            });
        }
        const cats = yield Cat_1.default.find();
        res.json({
            message: "success",
            data: cats,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "error",
            man: "bad boy",
        });
    }
}));
(0, mongoose_1.connectDatabase)().then(() => {
    // Listen on port
    app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(chalk_1.default.hex("#009e00")(`Server running on port ${PORT}`));
        console.log(chalk_1.default.cyanBright((0, utils_1.getServerTime)()));
    }));
});
