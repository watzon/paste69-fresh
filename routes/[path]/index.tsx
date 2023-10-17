import { Handlers, PageProps } from "$fresh/server.ts";
import ToolBox from "../../islands/ToolBox.tsx";
import { Head } from "$fresh/runtime.ts";
import Paste from "../../interfaces/paste-schema.ts";
import { RenderedContent } from "../../islands/RenderedContent.tsx";

export const handler: Handlers<Paste> = {
  async GET(_req, ctx) {
    const { path } = ctx.params;
    const [id, _] = path.split(".");
    const result = await fetch(
      `${Deno.env.get("SITE_URL")}/api/pastes/${id}`,
    );
    const paste = await result.json();
    if (paste.error) {
      return ctx.renderNotFound();
    }
    return ctx.render(paste);
  },
};

export default function Home(props: PageProps<Paste>) {
  const { path } = props.params;

  let [id, ext] = path.split(".");
  ext ??= props.data.highlight

  let markdown = false;
  
  if (
    ["md", "markdown"].includes(ext) && props.url.searchParams.get("render")
  ) {
    markdown = true;
  }

  return (
    <>
      <Head>
        <title>Paste69 - viewing {id}</title>
      </Head>

      <div class="fixed bottom-0 right-0">
        <ToolBox pasteId={id} />
      </div>
      <RenderedContent id={id} ext={ext} paste={props.data} markdown={markdown} />
      <div class="h-20 md:h-6"></div>
    </>
  );
}
