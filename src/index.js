import express from "express";
import path from "path";

import User from "./models/user";

import "./db/mongoose";

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/users", (req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(e => console.log(e));
});

// Handles any requests that don't match the ones above
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
