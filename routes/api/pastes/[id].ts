import { Handlers } from "$fresh/server.ts";
import { client } from "../../../utils/db.ts";
import Paste from "../../../interfaces/paste.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;

    const result = await client.queryObject<Paste>({
      camelcase: true,
      text: "SELECT * FROM pastes WHERE id = $1",
      args: [id],
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
