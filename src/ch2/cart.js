const { db } = require("./dbConnection");

function addItem(cartId, itemName) {
  return db("carts_items").insert({ cartId, itemName });
}

function createCart(username) {
  return db("carts").insert({ username });
}

module.exports = {
  addItem,
  createCart,
};
