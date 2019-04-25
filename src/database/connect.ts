import * as Knex from "knex";

export function createConnection(config: Knex.MySqlConnectionConfig) {
  return Knex({
    client: "mysql",
    useNullAsDefault: true,
    connection: config
  });
}
