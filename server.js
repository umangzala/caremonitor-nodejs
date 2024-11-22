import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import ormConfig from "./src/config/ormconfig.js";
import heartRateRoutes from "./src/routes/heartRateRoutes.js";

const app = express();

app.use(bodyParser.json());

createConnection(ormConfig)
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL", err);
  });

app.use("/api", heartRateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
