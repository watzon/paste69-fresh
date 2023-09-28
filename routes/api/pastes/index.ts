import { Handlers } from "$fresh/server.ts";
import { Paste } from "../../../db/db.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { contents } = await req.json();
    const paste = await Paste.create({ contents });
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
