import { LayoutProps } from "$fresh/server.ts";
import ToolBox from "../islands/ToolBox.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";

export default function Layout({ Component }: LayoutProps) {
  return (
    <Component />
  );
}
