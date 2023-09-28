import ToolBox from "../islands/ToolBox.tsx";

export default function About() {
  return (
    <>
      <div class="fixed bottom-0 right-0">
        <ToolBox disableSave={true} />
      </div>
      <div class="flex flex-col w-full h-full pl-8 prose prose-xl dark:prose-dark">
        <h1 class="mb-2">Paste69</h1>

        <p>
          Paste69 is a pastebin service built with{" "}
          <a href="https://deno.land">Deno</a> and{" "}
          <a href="https://fresh.deno.land">Fresh</a>. It's a simple, fast, and
          easy to use pastebin service based on HasteBin. Like HasteBin, it's
          also open source and can be found over on{" "}
          <a href="https://github.com/watzon/paste69-fresh">GitHub</a>.
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
