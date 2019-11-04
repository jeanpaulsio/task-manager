import express from "express";
import path from "path";

import TaskRouter from "./routers/task";

import "./db/mongoose";

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(TaskRouter);

// Handles any requests that don't match the ones above
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
