import { LayoutProps } from "$fresh/server.ts";

export default function Layout({ Component }: LayoutProps) {
  return (
    <div class="flex flex-col w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-x-auto">
      <Component />
    </div>
  );
}
