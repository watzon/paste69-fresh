#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import { load as loadDotenv } from "$std/dotenv/mod.ts";

await loadDotenv({
    allowEmptyValues: true,
    export: true,
})

await dev(import.meta.url, "./main.ts", config);
