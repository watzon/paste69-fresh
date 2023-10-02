import { Client } from "postgres/mod.ts";

export const client = new Client({
  database: Deno.env.get("DB_NAME")!,
  hostname: Deno.env.get("DB_HOST")!,
  user: Deno.env.get("DB_USER")!,
  password: Deno.env.get("DB_PASSWORD")!,
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
});

await client.connect();
