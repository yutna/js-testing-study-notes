const fetch = require("isomorphic-fetch");
const app = require("./server");

const apiRoot = "http://localhost:3000";

afterAll(() => {
  app.close();
});

test("adding items to a cart", async () => {
  const initialItemsResponse = await getItems("lucas");
  expect(initialItemsResponse.status).toEqual(404);

  const addItemResponse = await addItem("lucas", "cheesecake");
  expect(await addItemResponse.json()).toEqual(["cheesecake"]);

  const finalItemsResponse = await getItems("lucas");
  expect(await finalItemsResponse.json()).toEqual(["cheesecake"]);
});

// Test helpers

function addItem(username, item) {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
    method: "POST",
  });
}

function getItems(username) {
  return fetch(`${apiRoot}/carts/${username}/items`, { method: "GET" });
}
