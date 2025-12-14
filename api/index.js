import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

// регистрация пользователя
app.post("/api/user", (req, res) => {
  const { userId, ref } = req.body;

  if (!users[userId]) {
    users[userId] = { balance: 0 };

    if (ref && users[ref]) {
      users[ref].balance += 10;
    }
  }

  res.json(users[userId]);
});

// клик
app.post("/api/click", (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = { balance: 0 };
  }

  users[userId].balance += 1;
  res.json({ balance: users[userId].balance });
});

export default app;

