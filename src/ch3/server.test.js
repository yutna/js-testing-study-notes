const fetch = require("isomorphic-fetch");
const { app, carts } = require("./server");
const { inventory } = require("./inventoryController");

const apiRoot = "http://localhost:3000";

afterAll(() => {
  app.close();
});

describe("addItem", () => {
  beforeEach(() => {
    carts.clear();
    inventory.set("cheesecake", 1);
  });

  test("correct response", async () => {
    const addItemResponse = await addItem("lucas", "cheesecake");
    expect(addItemResponse.status).toBe(200);
    expect(await addItemResponse.json()).toEqual(["cheesecake"]);
  });

  test("inventory update", async () => {
    await addItem("lucas", "cheesecake");
    expect(inventory.get("cheesecake")).toBe(0);
  });

  test("carts update", async () => {
    await addItem("keith", "cheesecake");
    expect(carts.get("keith")).toEqual(["cheesecake"]);
  });

  test("sold out items", async () => {
    inventory.set("cheesecake", 0);
    const failedAddItem = await addItem("lucas", "cheesecake");
    expect(failedAddItem.status).toBe(404);
  });
});

describe("GET: /inventory", () => {
  afterEach(() => {
    inventory.clear();
  });

  test("fetching inventory", async () => {
    inventory.set("cheesecake", 1).set("macarroon", 2);

    const getInventoryResponse = await sendGetInventoryRequest();
    const expected = {
      cheesecake: 1,
      macarroon: 2,
      generatedAt: expect.anything(),
    };

    expect(await getInventoryResponse.json()).toEqual(expected);
  });
});

// Test helpers

function addItem(username, item) {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
    method: "POST",
  });
}

function sendGetInventoryRequest() {
  return fetch(`${apiRoot}/inventory`, {
    method: "GET",
  });
}
