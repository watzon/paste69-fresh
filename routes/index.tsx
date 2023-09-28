import { Handlers, PageProps } from "$fresh/server.ts";
import Editor from "../islands/Editor.tsx";
import { Paste } from "../db/db.ts";
import ToolBox from "../islands/ToolBox.tsx";

export const handler: Handlers<Paste> = {
  async GET(req, ctx) {
    const copyId = new URL(req.url).searchParams.get("copy");
    if (copyId) {
      const paste = await Paste.find(copyId);
      if (paste) {
        return ctx.render(paste);
      }
    }
    return ctx.render();
  },
};

export default function Home(props: PageProps<Paste>) {
  return (
    <>
      <div class="fixed bottom-0 right-0">
        <ToolBox />
      </div>
      <div class="flex flex-col w-full h-full">
        <Editor
          contents={props.data ? props.data.contents as string : undefined}
        />
      </div>
    </>
  );
}
