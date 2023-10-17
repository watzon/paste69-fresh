import { asset } from "$fresh/runtime.ts";
import Button from "../components/Button.tsx";
import ColorMode from "./ColorMode.tsx";
import IconDeviceFloppy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/device-floppy.tsx";
import IconTextPlus from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/text-plus.tsx";
import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/copy.tsx";
import IconChevronDown from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/chevron-down.tsx"
import { useContext } from "preact/hooks";
import { AppState } from "./App.tsx";
import Switch from "./Switch.tsx";
import { useSignal } from "@preact/signals";

export interface ToolboxProps {
  pasteId?: string;
  disableSave?: boolean;
  extraOptions?: boolean;
}

export default function ToolBox(props: ToolboxProps) {
  const { editorContents, encryptPaste, setEncryptPaste, encryptionPassword, setEncryptionPassword, burnAfterReading, setBurnAfterReading } = useContext(AppState);

  const showExtraOptions = useSignal(false);

  const savePaste = async () => {
    if (!editorContents.value) return;
    
    const res = await fetch("/api/pastes", {
      method: "POST",
      body: JSON.stringify({ contents: editorContents.value, encrypt: encryptPaste.value, password: encryptionPassword.value, burnAfterReading: burnAfterReading.value }),
    });
    
    const { id, highlight } = await res.json();
    
    if (burnAfterReading.value) {
      window.location.href = `/${id}.${highlight}/created`;
    } else {
      window.location.href = `/${id}.${highlight}`;
    }
  };

  return (
    <div class="flex flex-row items-stretch max-w-[100vw] w-[595px] bg-gray-800">
      <a
        href="/about"
        class="flex flex-col items-center justify-center py-2 px-4 md:py-4 md:px-12 bg-black bg-opacity-50"
      >
        <img class="w-8" src={asset("/images/logo.svg")} />
      </a>

      <div class="flex justify-center items-center cursor-pointer px-4 bg-gray-800 brightness-75 hover:brightness-100" onClick={() => showExtraOptions.value = !showExtraOptions.value}>
        <IconChevronDown size={16} />
      </div>

      <div class="flex flex-col items-center justify-center px-8 py-4 w-full gap-6">
        <div class="flex flex-row justify-between gap-2 w-full">
          <Button
            title="Save"
            disabled={props.disableSave || !!props.pasteId}
            onClick={savePaste}
          >
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

        {props.extraOptions && showExtraOptions.value && (
          <div class="flex flex-row justify-between items-center w-full">
            <Switch label="Encrypt" checked={encryptPaste.value} onChange={(v) => { setEncryptPaste(v); console.log(v) }} />
            { encryptPaste.value && (
              <input
                type="password"
                placeholder="Password"
                class="w-1/3 h-8 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-800"
                value={encryptionPassword.value}
                onInput={(e) => setEncryptionPassword(e.currentTarget.value)}
              />
            )}
            <Switch label="Burn After Reading" checked={burnAfterReading.value} onChange={(v) => setBurnAfterReading(v)} />
          </div>
        )}
      </div>
    </div>
  );
}
