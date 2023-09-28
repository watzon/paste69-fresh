import { Handlers, PageProps } from "$fresh/server.ts";
import { languageMap } from "../../utils/languages.ts";
import ToolBox from "../../islands/ToolBox.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import hljs from "https://esm.sh/highlight.js@11.8.0/lib/core";
const { Marked } = await import("https://esm.sh/@ts-stack/markdown@1.5.0");
import { Paste } from "../../db/db.ts";

Marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

for (const [lang, exts] of Object.entries(languageMap)) {
  const _lang = await import(
    `https://esm.sh/highlight.js@11.8.0/lib/languages/${lang}.js`
  );

  if (exts.length > 0) {
    hljs.registerLanguage(lang, _lang.default);
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
    <div class="w-full h-full pb-32 sm:pb-0">
      <div class="absolute bottom-0 right-0">
        <ToolBox pasteId={id} />
      </div>

      <div class="flex flex-row w-full h-full justify-normal text-gray-900 dark:text-gray-100">
        <div class="flex flex-col w-12 h-full px-2 py-4 mr-2 text-gray-400 dark:text-gray-500 border-r border-gray-300 dark:border-gray-600">
          <IconChevronRight />
        </div>

        <div class="px-2 py-4 w-full h-full">
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
      </div>
    </div>
  );
}
