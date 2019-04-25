import { createConnection } from "./connect";
import { Model } from "objection";

let isDbInit = false;

const connection = createConnection({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME
});

connection.migrate.latest();
Model.knex(connection);

export async function initializeDB(config?:any) {

  if (!isDbInit) {
    if(config){
      
    }
    Model.knex(connection);
    isDbInit = true;
  }
}
