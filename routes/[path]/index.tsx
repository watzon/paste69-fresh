import { Handlers, PageProps } from "$fresh/server.ts";
import { extensionMap, languages } from "../../utils/languages.ts";
import hljs from "https://esm.sh/highlight.js@11.8.0/lib/core";
const { Marked } = await import("https://esm.sh/@ts-stack/markdown@1.5.0");
import { Paste } from "../../db/db.ts";
import ToolBox from "../../islands/ToolBox.tsx";

Marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

for (const [lang, exts] of Object.entries(extensionMap)) {
  if (exts.length > 0) {
    // Remove leading underscore, replace other underscores with dashes
    const name = lang.replace(/^_/, "").replace(/_/g, "-");
    // @ts-ignore: this is fine
    hljs.registerLanguage(name, languages[lang]!);
    hljs.registerAliases(exts, { languageName: lang });
  }
}

export const handler: Handlers<Paste> = {
  async GET(_req, ctx) {
    const { path } = ctx.params;
    const [id, _] = path.split(".");
    const paste = await Paste.find(id);
    if (!paste) {
      return new Response("Paste not found", { status: 404 });
    }
    return ctx.render(paste);
  },
};

export default function Home(props: PageProps<Paste>) {
  const { path } = props.params;

  let markdown = false;
  let output: string | undefined = undefined;
  let [id, ext] = path.split(".");

  if (!ext) {
    const result = hljs.highlightAuto(
      props.data.contents as string,
      [
        "javascript",
        "typescript",
        "css",
        "html",
        "json",
        "markdown",
        "php",
        "python",
        "ruby",
      ],
    );
    ext = result.language!;
    output = result.value;
  }

  // Check if the language is markdown, and if the `render` query param is set
  // to `true`. If so, render the markdown instead of the raw contents.
  if (
    ["md", "markdown"].includes(ext) && props.url.searchParams.get("render")
  ) {
    markdown = true;
    output = Marked.parse(props.data.contents as string);
  } else {
    if (!output) {
      const result = hljs.highlight(
        props.data.contents as string,
        { language: ext },
      );
      output = result.value;
    }
  }

  return (
    <>
      <div class="fixed bottom-0 right-0">
        <ToolBox pasteId={id} />
      </div>
      <div class="flex flex-col w-full h-full px-2 pt-4">
        {markdown
          ? (
            <div
              class="prose prose-xl dark:prose-dark"
              dangerouslySetInnerHTML={{ __html: output! }}
            />
          )
          : (
            <pre class="w-full h-full">
              <code
                dangerouslySetInnerHTML={{ __html: output! }}
              />
            </pre>
          )}
      </div>
    </>
  );
}
