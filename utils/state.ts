import { Signal, signal } from "@preact/signals";
import { Marked } from "https://esm.sh/@ts-stack/markdown@1.5.0";
import { highlight } from "./hljs.ts";

Marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

export interface AppStateType {
  readonly editorContents: Signal<string>;
  readonly encryptPaste: Signal<boolean>;
  readonly encryptionPassword: Signal<string>;
  readonly burnAfterReading: Signal<boolean>;
  readonly renderedContents: Signal<string>;

  setEditorContents: (contents: string) => void;
  setEncryptPaste: (encrypt: boolean) => void;
  setEncryptionPassword: (password: string) => void;
  setBurnAfterReading: (burn: boolean) => void;
  renderContents: (contents: string, opts: { ext?: string, markdown?: boolean }) => void;
}

function createAppState(): AppStateType {
  const editorContents = signal("");
  const encryptPaste = signal(false);
  const encryptionPassword = signal("");
  const burnAfterReading = signal(false);
  const renderedContents = signal("");

  function setEditorContents(contents: string) {
    editorContents.value = contents;
  }

  function setEncryptPaste(encrypt: boolean) {
    encryptPaste.value = encrypt;
  }

  function setEncryptionPassword(password: string) {
    encryptionPassword.value = password;
  }

  function setBurnAfterReading(burn: boolean) {
    burnAfterReading.value = burn;
  }

  function renderContents(contents: string, { ext, markdown }: { ext?: string; markdown?: boolean }) {
    if (markdown) {
      renderedContents.value = Marked.parse(contents);
    } else {
      try {
        renderedContents.value = highlight(contents, ext);
      } catch {
        renderedContents.value = contents;
      }
    }
  }

  return {
    editorContents,
    encryptPaste,
    encryptionPassword,
    burnAfterReading,
    renderedContents,
    setEditorContents,
    setEncryptPaste,
    setEncryptionPassword,
    setBurnAfterReading,
    renderContents,
  };
}

export default createAppState();
