const inventory = new Map();

function removeFromInventory(item) {
  if (!inventory.has(item) || !inventory.get(item) > 0) {
    const err = new Error(`${item} is unavailable`);
    err.code = 400;
    throw err;
  }

  inventory.set(item, inventory.get(item) - 1);
}

module.exports = {
  inventory,
  removeFromInventory,
};
