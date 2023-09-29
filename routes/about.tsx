import ToolBox from "../islands/ToolBox.tsx";
import IconDeviceFloppy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/device-floppy.tsx";
import IconTextPlus from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/text-plus.tsx";
import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/copy.tsx";
import IconMoon from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/moon.tsx";
import IconSun from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/sun.tsx";

export default function About() {
  return (
    <>
      <div class="fixed bottom-0 right-0">
        <ToolBox disableSave={true} />
      </div>
      <div class="h-full pl-8 prose prose-xl dark:prose-dark">
        <h1 class="mb-2">Paste69</h1>

        <p>
          Paste69 is a pastebin service built with{" "}
          <a href="https://deno.land">Deno</a> and{" "}
          <a href="https://fresh.deno.land">Fresh</a>. It's a simple, fast, and
          easy to use pastebin service based on HasteBin. Like HasteBin, it's
          also open source and can be found over on{" "}
          <a href="https://github.com/watzon/paste69-fresh">GitHub</a>.
        </p>

        <h2 class="mt-4 mb-2">Usage</h2>

        <p>
          To create a paste, go <a href="/">home</a> or click the "New" button (<IconTextPlus class="inline-block w-4 h-4" />)
          in the tool box in the bottom right corner of the page. Paste whatever text you want into the editor,
          and click the "Save" button (<IconDeviceFloppy class="inline-block w-4 h-4" />) to create the paste.
        </p>

        <p>
          To copy an existing paste, click the "Copy" button (<IconCopy class="inline-block w-4 h-4" />)
          in the tool box in the bottom right corner of the page. This will start a new paste with
          the contents of the existing paste.
        </p>

        <p>
          Lastly, use the "Toggle theme" button (<IconMoon class="inline-block w-4 h-4" />/<IconSun class="inline-block w-4 h-4" />)
          to toggle between light and dark mode. The theme you choose will be saved in your browser's
          local storage, and loaded the next time you visit the site.
        </p>

        <h2 class="mt-4 mb-2">API</h2>

        <p>
          Paste69 has a simple API for creating and fetching pastes. The API is
          documented below.
        </p>

        <h3 class="mt-4 mb-2">Creating a paste</h3>

        <p>
          To create a paste, send a POST request to <code>/api/pastes</code>
          {" "}
          with the following JSON body:
        </p>

        <pre>
          <code>
              {`{ "contents": "paste contents" }`}
          </code>
        </pre>

        <p>
          If the paste was successfully created, the API will respond with the
          following JSON:
        </p>

        <pre>
                    <code>
                        {`{
    "id": "paste id",
    "contents": "paste contents",
    "views": 0,
    "created_at": "2021-08-05T07:30:00.000Z",
}`}
                    </code>
        </pre>

        <h3 class="mt-4 mb-2">Fetching a paste</h3>

        <p>
          To fetch a paste, send a GET request to{" "}
          <code>/api/pastes/:id</code>. If the paste exists, the API will
          respond with the following JSON:
        </p>

        <pre>
                    <code>
                        {`{
    "id": "paste id",
    "contents": "paste contents",
    "views": 0,
    "created_at": "2021-08-05T07:30:00.000Z",
}`}
                    </code>
        </pre>
      </div>
    </>
  );
}
