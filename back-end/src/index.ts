import dotenv from "dotenv";
import chalk from "chalk";
import express, { Express } from "express";
import { cors, getServerTime } from "./utils";
import { faker } from "@faker-js/faker";
import Cat from "./Cat";
import { connectDatabase } from "./mongoose";

const PORT = process.env.PORT;
const TASK = process.env.TASK;
if (!PORT) {
  console.log(chalk.red("No PORT provided"));
  process.exit(1);
}

// Configures the environment variables
dotenv.config(); 

// Acquire an instance of Express
const app: Express = express();

// Allow incomming incoming cors
app.use(cors);

// Parse incoming requests and 20mb limit
app.use(express.json({ limit: "50mb" }));

// Parse form body and encodes
app.use(express.urlencoded({ extended: true }));

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
app.get("/cats", async (req, res) => {
  try {
    for (let i = 0; i < 5; i++) {
      await Cat.create({
        name: faker.internet.userName(),
        cuteness: faker.number.int({ min: 0, max: 10 }),
      });
    }

    const cats = await Cat.find();
    res.json({
      message: "success",
      data: cats,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
      man: "bad boy",
    });
  }
});

connectDatabase().then(() => {
  // Listen on port
  app.listen(PORT, async () => {
    console.log(chalk.hex("#009e00")(`Server running on port ${PORT}`));
    console.log(chalk.cyanBright(getServerTime()));
  });
});
