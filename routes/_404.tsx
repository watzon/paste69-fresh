import { Head } from "$fresh/runtime.ts";
import ToolBox from "../islands/ToolBox.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>Paste69 - Page not found</title>
      </Head>
      <div class="fixed bottom-0 right-0">
        <ToolBox disableSave={true} />
      </div>
      <div class="flex flex-row items-center justify-center h-screen">
        <div class="prose prose-xl dark:prose-dark text-center">
          <h1 class="mb-2 p-0">404</h1>
          <p class="mb-2">The page you're looking for could not be found.</p>
        </div>
      </div>
    </>
  );
}
