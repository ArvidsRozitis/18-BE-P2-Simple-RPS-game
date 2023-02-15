import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

app.use("/locales", express.static("locales"));

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});

app.get("/scores", (req: Request, res: Response) => {
  pool.query("SELECT * FROM user_scores", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "123456",
  database: "rockPaperScissors",
  port: 3306,
});
