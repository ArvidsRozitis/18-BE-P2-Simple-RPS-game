import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));
app.use("/locales", express.static("locales"));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});
// *** get all scores ***
app.get("/scores", (req: Request, res: Response) => {
  pool.query("SELECT * FROM user_scores", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// *** post new user ***
app.post("/scores/post", (req: Request, res: Response) => {
  const { playerName, roundsWon, roundsLost, gamesWon } = req.body;
  pool.query(
    `INSERT INTO user_scores (playerName, roundsWon, roundsLost, gamesWon) VALUES (?, ?, ?, ?)`,
    [playerName, roundsWon, roundsLost, gamesWon],
    (error, results) => {
      if (error) {
        res.send({ error: "An error occurred while adding the score." });
        return;
      }
      res.send(results);
    }
  );
});

//*** update user ***/
app.put("/scores/put/:id", (req: Request, res: Response) => {
  const scoreID = req.params.id;
  const { roundsWon, roundsLost, gamesWon } = req.body;
  pool.query(
    `UPDATE user_scores SET roundsWon = ?, roundsLost = ?, gamesWon = ? WHERE id = ?`,
    [roundsWon, roundsLost, gamesWon, scoreID],
    (error) => {
      if (error) {
        res.send({ error: "An error occurred while updating the score." });
        return;
      }
      res.send({ message: "Score updated successfully." });
    }
  );
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "123456",
  database: "rockPaperScissors",
  port: 3306,
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
