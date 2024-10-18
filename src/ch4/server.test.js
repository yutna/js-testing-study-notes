const request = require("supertest");

const { app } = require("./server");

const { carts } = require("./cartController");
const { inventory } = require("./inventoryController");

const apiRoot = "http://localhost:3000";

afterAll(() => {
  app.close();
});

afterEach(() => {
  inventory.clear();
});

describe("add items to a cart", () => {
  test("adding available items", async () => {
    inventory.set("cheesecake", 1);

    const response = await request(apiRoot)
      .post("/carts/test_user/items/cheesecake")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(["cheesecake"]);
    expect(inventory.get("cheesecake")).toEqual(0);
    expect(carts.get("test_user")).toEqual(["cheesecake"]);
  });
});
