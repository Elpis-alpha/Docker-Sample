import mongoose from "mongoose";
import chalk from "chalk";
const MONGODB_URL = "mongodb://mongo-db:27017/sample-docker"

// Connect Mongo Database
export const connectDatabase = async () => {
  const connected = new Promise(async (resolve) => {
    let time = 1;
    while (true) {
      console.log(chalk.yellow("\nConnecting to Database..."));
      try {
        await mongoose.connect(MONGODB_URL);
        console.log(chalk.hex("#009e00")(`Database Connected Succesfully\n`));
        resolve(true);
        break;
      } catch (error) {
        if (time > 50) {
          console.log(chalk.red("Database Connection Failed. Exiting..."));
          process.exit(1);
        } else {
          console.log(
            chalk.hex("#ea7b4b")(
              `Database Connection Failed. Attempting reconnection in ${time}s...\n`
            )
          );
          await new Promise((resolve) => setTimeout(resolve, 1000 * time));
        }
        continue;
      } finally {
        time = time + 2;
      }
    }
  });

  return connected;
};
