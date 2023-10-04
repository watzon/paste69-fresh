import { Handlers, PageProps } from "$fresh/server.ts";
import { Marked } from "https://esm.sh/@ts-stack/markdown@1.5.0";
import ToolBox from "../../islands/ToolBox.tsx";
import { Head } from "$fresh/runtime.ts";
import { highlight } from "../../utils/hljs.ts";
import Paste from "../../interfaces/paste-schema.ts";

Marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

export const handler: Handlers<Paste> = {
  async GET(_req, ctx) {
    const { path } = ctx.params;
    const [id, _] = path.split(".");
    const result = await fetch(
      `${Deno.env.get("SITE_URL")}/api/pastes/${id}`,
    );
    const paste = await result.json();
    if (!paste) {
      return ctx.renderNotFound();
    }
    return ctx.render(paste);
  },
};

export default function Home(props: PageProps<Paste>) {
  const { path } = props.params;

  let markdown = false;
  const lines = (props.data.contents as string).split("\n");

  let [id, ext] = path.split(".");
  ext ??= props.data.highlight

  let output: string;

  // Check if the language is markdown, and if the `render` query param is set
  // to `true`. If so, render the markdown instead of the raw contents.
  if (
    ["md", "markdown"].includes(ext) && props.url.searchParams.get("render")
  ) {
    markdown = true;
    output = Marked.parse(props.data.contents as string);
  } else {
    try {
      output = highlight(props.data.contents as string, ext);
    } catch {
      output = props.data.contents as string;
    }
  }

  return (
    <>
      <Head>
        <title>Paste69 - viewing {id}</title>
      </Head>
      <div class="fixed bottom-0 right-0">
        <ToolBox pasteId={id} />
      </div>
      {markdown
        ? (
          <div
            class="prose prose-xl dark:prose-dark"
            dangerouslySetInnerHTML={{ __html: output! }}
          />
        )
        : (
          <>
            <div class="absolute text-left w-[30px] top-[20px] left-[5px]">
              {Array.from(lines).map((_, i) => (
                <div class="text-gray-400 dark:text-gray-500">{i + 1}</div>
              ))}
            </div>
            <pre>
              <code
                dangerouslySetInnerHTML={{ __html: output! }}
                />
            </pre>
          </>
        )}
      <div class="h-20 md:h-6"></div>
    </>
  );
}
