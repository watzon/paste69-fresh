import { Handlers } from "$fresh/server.ts";
import { pastes } from "../../../utils/db.ts";
import { generate } from "npm:random-words";
import { detectLanguage } from "../../../utils/hljs.ts";
import { encrypt as encryptContents } from "../../../utils/encryption.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    let { contents, encrypt, password, burnAfterReading } = await req.json();
    const id = generate({ exactly: 3, join: "-" });

    if (!contents || contents.length === 0) {
      return new Response(JSON.stringify({ error: "No contents provided" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const highlight = detectLanguage(contents) || "txt";
    const createdAt = new Date();

    if (encrypt) {
      if (!password || password.length === 0) {
        return new Response(JSON.stringify({ error: "No password provided" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      contents = await encryptContents(contents, password);
    }

    await pastes.insertOne({
      id,
      contents,
      highlight,
      encrypted: encrypt,
      burnAfterReading,
      createdAt,
    });

    const response = {
      id,
      highlight,
      url: `${Deno.env.get("SITE_URL")}/${id}.${highlight}`,
      createdAt,
    };

    return new Response(JSON.stringify(response), {
      headers: { "content-type": "application/json" },
    });
  },
};
