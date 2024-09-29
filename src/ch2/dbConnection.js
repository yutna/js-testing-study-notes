const db = require("knex")(require("./knexfile").development);

function closeConnection() {
  return db.destroy();
}

module.exports = {
  db,
  closeConnection,
};
