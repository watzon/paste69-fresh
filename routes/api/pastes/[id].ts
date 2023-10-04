import { Handlers } from "$fresh/server.ts";
import { pastes } from "../../../utils/db.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;

    const paste = await pastes.findOne({ id });

    if (!paste) {
      return new Response(JSON.stringify({ error: "Paste not found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    const response = {
      id: paste.id,
      url: `${Deno.env.get("SITE_URL")}/${paste.id}.${paste.highlight}`,
      contents: paste.contents,
      highlight: paste.highlight,
      createdAt: paste.createdAt,
    };

    return new Response(JSON.stringify(response), {
      headers: { "content-type": "application/json" },
    });
  },
};
