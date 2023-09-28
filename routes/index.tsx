import { Handlers, PageProps } from "$fresh/server.ts";
import Editor from "../islands/Editor.tsx";
import ToolBox from "../islands/ToolBox.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import { Paste } from "../db/db.ts";

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
    <div class="w-full h-full pb-32 sm:pb-0">
      <div class="fixed bottom-0 right-0">
        <ToolBox />
      </div>
      <div class="flex flex-row w-full h-full justify-normal">
        <div class="flex flex-col w-12 h-full px-2 py-4 mr-2 text-gray-400 dark:text-gray-500 border-r border-gray-300 dark:border-gray-600">
          <IconChevronRight />
        </div>

        <div class="flex flex-col w-full h-full">
          <Editor
            contents={props.data ? props.data.contents as string : undefined}
          />
        </div>
      </div>
    </div>
  );
}
