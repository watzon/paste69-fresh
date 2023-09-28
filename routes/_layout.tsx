import { LayoutProps } from "$fresh/server.ts";
import ToolBox from "../islands/ToolBox.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";

export default function Layout({ Component }: LayoutProps) {
  return (
    <div class="flex flex-col w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-x-auto">
      <div class="w-full h-full pb-32 sm:pb-0">
        <div class="flex flex-row w-full h-full justify-normal">
          <div class="flex flex-col w-12 h-full px-2 py-4 mr-2 text-gray-400 dark:text-gray-500 border-r border-gray-300 dark:border-gray-600">
            <IconChevronRight />
          </div>

          <Component />
        </div>
      </div>
    </div>
  );
}
