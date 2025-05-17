import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import errorHandler from "./middlewares/errors.middleware";
import routes from "./routes";
import logger from "./helpers/logger.helper";
import { seed } from "./seeders";

// CREATE EXPRESS APP
const app: Application = express();

app.use(morgan("dev"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

app.use(errorHandler);

// DATABASE CONNECTION
AppDataSource.initialize()
  .then(async () => {
    logger.success(`${process.env.DB_NAME} connected`);
    // SEED DATA
    await seed();
    logger.success("Seeded successfully");
  })
  .catch((error) => {
    logger.error("Database connection failed", error);
  });

export default app;
