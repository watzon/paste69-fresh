import { Handlers } from "$fresh/server.ts";
import { client } from "../../../utils/db.ts";
import Paste from "../../../interfaces/paste.ts";
import { generate } from "npm:random-words";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { contents } = await req.json();
    const id = generate({ exactly: 3, join: "-" });

    if (!contents || contents.length === 0) {
      return new Response(JSON.stringify({ error: "No contents provided" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const result = await client.queryObject<Paste>({
      camelcase: true,
      text: "INSERT INTO pastes (id, contents) VALUES ($1, $2) RETURNING *",
      args: [id, contents],
    });
    const paste = result.rows[0];

    const response = {
      id: paste.id,
      contents: paste.contents,
      views: paste.views,
      createdAt: paste.createdAt,
    };

    return new Response(JSON.stringify(response), {
      headers: { "content-type": "application/json" },
    });
  },
};
