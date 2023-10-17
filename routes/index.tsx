import { Handlers, PageProps } from "$fresh/server.ts";
import Paste from "../interfaces/paste-schema.ts";
import Editor from "../islands/Editor.tsx";
import ToolBox from "../islands/ToolBox.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import App from "../islands/App.tsx";

export const handler: Handlers<Paste> = {
  async GET(req, ctx) {
    const copyId = new URL(req.url).searchParams.get("copy");
    if (copyId) {
      const result = await fetch(
        `${Deno.env.get("SITE_URL")}/api/pastes/${copyId}`,
      );
      const paste = await result.json() as Paste;
      return ctx.render(paste);
    }
    return ctx.render();
  },
};

export default function Index(props: PageProps<Paste>) {
  return (
    <App>
      <div class="absolute top-[18px] left-[5px]">
        <IconChevronRight />
      </div>
      <div class="fixed bottom-0 right-0">
        <ToolBox extraOptions={true} />
      </div>
      <Editor
        contents={props.data ? props.data.contents as string : undefined}
      />
      <div class="h-20 md:h-6"></div>
    </App>
  );
}
