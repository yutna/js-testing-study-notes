const { logError, logInfo } = require("./logger");

const inventory = new Map();

function addToInventory(item, quantity) {
  if (typeof quantity !== "number") {
    logError({ item, quantity }, "Quantity must be a number");
    throw new Error("Quantity must be a number");
  }

  const currentQuantity = inventory.get(item) || 0;
  const newQuantity = currentQuantity + quantity;

  inventory.set(item, newQuantity);
  logInfo(
    { item, quantity, memoryUsage: process.memoryUsage().rss },
    "item added to the inventory",
  );

  return newQuantity;
}

function getInventory() {
  const contentArray = Array.from(inventory.entries());
  const contents = contentArray.reduce((contents, [name, quantity]) => {
    return { ...contents, [name]: quantity };
  }, {});

  logInfo({ contents }, "inventory items fetched");

  return {
    ...contents,
    generatedAt: new Date(),
  };
}

module.exports = {
  addToInventory,
  getInventory,
  inventory,
};
