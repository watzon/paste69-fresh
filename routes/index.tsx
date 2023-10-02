import { Handlers, PageProps } from "$fresh/server.ts";
import Paste from "../interfaces/paste.ts";
import Editor from "../islands/Editor.tsx";
import ToolBox from "../islands/ToolBox.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";

export const handler: Handlers<Paste> = {
  async GET(req, ctx) {
    const copyId = new URL(req.url).searchParams.get("copy");
    if (copyId) {
      const result = await fetch(
        `${Deno.env.get("SITE_URL")}/api/pastes/${copyId}`,
      );
      const paste = await result.json();
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
      <div class="absolute top-[18px] left-[5px]">
        <IconChevronRight />
      </div>
      <div class="fixed bottom-0 right-0">
        <ToolBox />
      </div>
      <Editor
        contents={props.data ? props.data.contents as string : undefined}
      />
      <div class="h-20 md:h-6"></div>
    </>
  );
}
