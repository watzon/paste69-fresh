import { Database, PostgresConnector } from "denodb/mod.ts";
import Paste from "./models/paste.ts";

export const connector = new PostgresConnector({
  database: Deno.env.get("DB_NAME")!,
  host: Deno.env.get("DB_HOST")!,
  username: Deno.env.get("DB_USER")!,
  password: Deno.env.get("DB_PASSWORD")!,
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
});

export const db = new Database({ connector });

db.link([Paste]);
// db.sync();

export { Paste };
