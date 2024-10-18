const fs = require("fs");

const {
  addItemToCart,
  carts,
  compilesToItemLimit,
} = require("./cartController");
const { inventory } = require("./inventoryController");

afterEach(() => {
  inventory.clear();
  carts.clear();
});

describe("addItemToCart", () => {
  beforeEach(() => {
    fs.writeFileSync(__dirname + "/tmp/logs.out", "");
  });

  test("adding unavailable items to cart", () => {
    carts.set("test_user", []);
    inventory.set("cheesecake", 0);

    try {
      addItemToCart("test_user", "cheesecake");
    } catch (e) {
      const expectedError = new Error(`cheesecake is unavailable`);
      expectedError.code = 400;

      expect(e).toEqual(expectedError);
    }

    expect(carts.get("test_user")).toEqual([]);
    expect.assertions(2);
  });

  test("logging added items", () => {
    carts.set("test_user", []);
    inventory.set("cheesecake", 1);

    addItemToCart("test_user", "cheesecake");

    const logs = fs.readFileSync(__dirname + "/tmp/logs.out", "utf-8");
    expect(logs).toContain("cheesecake added to test_user's cart\n");
  });
});

describe("compilesToItemLimit", () => {
  test("returns true for carts with no more than 3 items of a kind", () => {
    const cart = ["cheesecake", "cheesecake", "almond brownie", "apple pie"];
    expect(compilesToItemLimit(cart)).toBe(true);
  });

  test("returns false for carts with more than 3 items of a kine", () => {
    const cart = [
      "cheesecake",
      "cheesecake",
      "almond brownie",
      "cheesecake",
      "cheesecake",
    ];

    expect(compilesToItemLimit(cart)).toBe(false);
  });
});
