const express = require("express");
const app = express();
const cors = require("cors");
const transactionController = require("./controllers/transactionController");

app.use(cors());

app.use(express.json());

app.use("/transactions", transactionController);
app.get("/", (request, response) => {
  response.send("Budget App");
});

app.get("*", (request, response) => {
  response.status(404).json({ error: "Page not found" });
});
module.exports = app;
