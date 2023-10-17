import { Head } from "$fresh/runtime.ts";
import { ErrorPageProps } from "$fresh/server.ts";
import ToolBox from "../islands/ToolBox.tsx";
import { Sentry } from "../utils/sentry.ts";

export default function Error404({ error }: ErrorPageProps) {
  Sentry.captureException(error);
  
  return (
    <>
      <Head>
        <title>Paste69 - Internal Server Error</title>
      </Head>
      <div class="fixed bottom-0 right-0">
        <ToolBox disableSave={true} />
      </div>
      <div class="flex flex-row items-center justify-center h-screen">
        <div class="prose prose-xl dark:prose-dark text-center">
          <h1 class="mb-2 p-0">500</h1>
          <p class="mb-2">Something bad has happened on our end. Sorry!</p>
        </div>
      </div>
    </>
  );
}
