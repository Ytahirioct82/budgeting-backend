const express = require("express");
const { request } = require("../app");
const { uuid } = require("uuidv4");

const budgetAmountArray = require("../models/transactions");

const transactions = express.Router();

transactions.get("/", (request, response) => {
  budgetAmountArray.length
    ? response.status(200).json(budgetAmountArray)
    : response.status(404).json({ error: "site not found" });
});

transactions.post("/", (request, response) => {
  console.log(uuid());
  budgetAmountArray.push(request.body);
  budgetAmountArray[budgetAmountArray.length - 1].id = uuid();
  Object.keys(request.body).length
    ? response.status(200).json(budgetAmountArray)
    : response.status(404).json({ error: "site not found" });
});

transactions.put("/:arrayIndex", (request, response) => {
  const { arrayIndex } = request.params;
  const index = budgetAmountArray.findIndex((element) => element.id === arrayIndex);
  budgetAmountArray[index]
    ? response.status(200).json(budgetAmountArray.splice(index, 1, request.body)[0])
    : response.status(404).json({ error: "site not found" });
});

transactions.delete("/:arrayIndex", (request, response) => {
  const { arrayIndex } = request.params;
  const index = budgetAmountArray.findIndex((element) => element.id === arrayIndex);
  budgetAmountArray[index]
    ? response.status(200).json(budgetAmountArray.splice(index, 1)[0])
    : response.status(404).json({ error: "site not found" });
});

transactions.get("/:arrayIndex", (request, response) => {
  const { arrayIndex } = request.params;
  const found = budgetAmountArray.find((element) => element.id === arrayIndex);
  found ? response.json(found) : response.status(404).json({ error: "site not found" });
});

module.exports = transactions;
