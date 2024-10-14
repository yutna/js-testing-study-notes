const Koa = require("koa");
const Router = require("koa-router");
const { getInventory, inventory } = require("./inventoryController");

const app = new Koa();
const router = new Router();

const carts = new Map();

router.get("/inventory", (ctx) => {
  ctx.body = getInventory();
});

router.post("/carts/:username/items/:item", (ctx) => {
  const { username, item } = ctx.params;

  if (!inventory.get(item)) {
    ctx.status = 404;
    return;
  }

  inventory.set(item, inventory.get(item) - 1);

  const newItems = (carts.get(username) || []).concat(item);

  carts.set(username, newItems);
  ctx.body = newItems;
});

app.use(router.routes());

module.exports = {
  app: app.listen(3000),
  carts,
};
