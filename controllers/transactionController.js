const express = require("express");
const {request} = require("../app");

const budgetAmountArray = require("../models/transactions");

const transactions = express.Router();
// console.log(budgetAmountArray)
transactions.get("/", (request, response) => {
  budgetAmountArray.length
    ? response.status(200).json(budgetAmountArray)
    :response.status(404).json({ error: "site not found" });
    
});

transactions.post("/", (request, response) => {
  if (Object.keys(request.body).length) {
    budgetAmountArray.push(request.body);
    response.status(200).json(budgetAmountArray);
  } else response.status(404).json({ error: "site not found" });
});

transactions.put("/:arrayIndex", (request, response) => {
  const { arrayIndex } = request.params;

  budgetAmountArray[arrayIndex]
    ? response.json((budgetAmountArray[arrayIndex] = request.body))
    : response.status(404).json({ error: "site not found" });
});

transactions.delete("/:arrayIndex", (request, response) => {
  const { arrayIndex } = request.params;
  budgetAmountArray[arrayIndex]
    ? response.status(200).json(budgetAmountArray.splice(arrayIndex, 1)[0])
    : response.status(404).json({ error: "site not found" });
});
transactions.get("/:arrayIndex", (request, response) => {
  const { arrayIndex } = request.params;
  arrayIndex < budgetAmountArray.length ? response.json(budgetAmountArray[arrayIndex]) : response.redirect("/");
});

module.exports = transactions;
