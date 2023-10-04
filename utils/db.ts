import { MongoClient } from "mongodb/mod.ts";
import PasteSchema from "../interfaces/paste-schema.ts";

export const client = new MongoClient();
await client.connect(Deno.env.get("DB_URL")!);

export const db = client.database("paste69");
export const pastes = db.collection<PasteSchema>("pastes");