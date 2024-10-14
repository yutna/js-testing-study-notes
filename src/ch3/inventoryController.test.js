const {
  addToInventory,
  getInventory,
  inventory,
} = require("./inventoryController");
const logger = require("./logger");

jest.mock("./logger");

describe("inventoryController", () => {
  beforeEach(() => {
    inventory.clear();
    jest.spyOn(process, "memoryUsage").mockReturnValue({
      external: 3,
      heapToTal: 1,
      heapUsed: 2,
      rss: 123456,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("#addToInventory", () => {
    test("cancels operation for invalid quantities", () => {
      expect(() => addToInventory("cheesecake", "not a number")).toThrow();
      expect(Array.from(inventory.entries())).toHaveLength(0);
    });

    test("logging new items", () => {
      addToInventory("cheesecake", 2);
      expect(logger.logInfo.mock.calls).toHaveLength(1);

      const firstCallArgs = logger.logInfo.mock.calls[0];
      const [firstArg, secondArg] = firstCallArgs;

      expect(firstArg).toEqual({
        item: "cheesecake",
        quantity: 2,
        memoryUsage: 123456,
      });
      expect(secondArg).toEqual("item added to the inventory");
    });
  });

  describe("#getInventory", () => {
    test("inventory contents", () => {
      inventory
        .set("cheesecake", 1)
        .set("macarroon", 3)
        .set("croissant", 3)
        .set("eclaire", 7);

      const results = getInventory();

      expect(results).toEqual({
        cheesecake: 1,
        macarroon: 3,
        croissant: 3,
        eclaire: 7,
        generatedAt: expect.any(Date),
      });
    });

    test("generatedAt in the past", () => {
      const result = getInventory();
      const currentTime = new Date(Date.now() + 1);

      expect(result.generatedAt).toBeBefore(currentTime);
    });

    test("logging fetches", () => {
      inventory.set("cheesecake", 2);
      getInventory();

      expect(logger.logInfo.mock.calls).toHaveLength(1);

      const firstCallArgs = logger.logInfo.mock.calls[0];
      const [firstArg, secondArg] = firstCallArgs;

      expect(firstArg).toEqual({ contents: { cheesecake: 2 } });
      expect(secondArg).toEqual("inventory items fetched");
    });
  });
});
