import knex from "knex";
const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "joao1234",
    database: "library",
    port: 3306,
  },
  useNullAsDefault: true,
});

export default db;
