const { db, closeConnection } = require("./dbConnection");
const { createCart, addItem } = require("./cart");

beforeEach(async () => {
  await db("carts_items").truncate();
  await db("carts").truncate();
});

afterAll(async () => {
  await closeConnection();
});

test("createCart creates a cart for a username", async () => {
  await createCart("Lucas da Costa");
  const results = await db.select("username").from("carts");
  expect(results).toEqual([{ username: "Lucas da Costa" }]);
});

test("addItem adds an item to a cart", async () => {
  const username = "Lucas da Costa";
  await createCart(username);

  const { id: cartId } = await db.select().from("carts").where({ username });
  await addItem(cartId, "cheesecake");

  const result = await db.select("itemName").from("carts_items");
  expect(result).toEqual([{ id: cartId, itemName: "cheesecake" }]);
});
