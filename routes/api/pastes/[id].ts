import { Handlers } from "$fresh/server.ts";
import { Paste } from "../../../db/db.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = parseInt(ctx.params.id);
    const paste = await Paste.find(id);
    const response = {
      id: paste.id!.toString(),
      contents: paste.contents,
      views: paste.views,
      createdAt: paste.createdAt,
    };
    return new Response(JSON.stringify(response), {
      headers: { "content-type": "application/json" },
    });
  },
};
