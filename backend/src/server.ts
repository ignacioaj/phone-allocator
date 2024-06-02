import mysql from "mysql";
require("dotenv").config();
import express from "express";
import router from "./routes";
import cors from "cors";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
});

connection.connect((err: mysql.MysqlError) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connection to database successful!");
});

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});

export default connection;
