import { asset } from "$fresh/runtime.ts";
import Button from "../components/Button.tsx";
import ColorMode from "./ColorMode.tsx";
import IconDeviceFloppy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/device-floppy.tsx";
import IconTextPlus from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/text-plus.tsx";
import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/copy.tsx";
import { editorContents } from "../utils/state.ts";

export interface ToolboxProps {
  pasteId?: string;
  disableSave?: boolean;
}

export default function ToolBox(props: ToolboxProps) {
  const savePaste = async () => {
    const contents = editorContents.value;
    if (!contents) return;
    const res = await fetch("/api/pastes", {
      method: "POST",
      body: JSON.stringify({ contents }),
    });
    const { id } = await res.json();
    window.location.href = `/${id}`;
  };

  return (
    <div class="flex flex-row h-16 max-w-[100vw] w-[595px] bg-gray-800">
      <a
        href="/about"
        class="flex flex-col items-center justify-center py-2 px-4 md:py-4 md:px-6 bg-black bg-opacity-50"
      >
        <img class="w-8" src={asset("images/logo.svg")} />
      </a>

      <div class="flex flex-col items-center justify-center px-12 w-full">
        <div class="flex flex-row justify-between gap-2 w-full">
          <Button title="Save" disabled={props.disableSave || !!props.pasteId} onClick={savePaste}>
            <IconDeviceFloppy />
          </Button>
          <Button title="New" href="/">
            <IconTextPlus />
          </Button>
          <Button
            title="Copy"
            disabled={!props.pasteId}
            href={`/?copy=${props.pasteId}`}
          >
            <IconCopy />
          </Button>
          <ColorMode title="Toggle theme" />
        </div>
      </div>
    </div>
  );
}
