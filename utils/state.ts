import { Signal, signal } from "@preact/signals";

export interface AppStateType {
  readonly editorContents: Signal<string>;
  setEditorContents: (contents: string) => void;
}

function createAppState(): AppStateType {
  const editorContents = signal("");

  function setEditorContents(contents: string) {
    editorContents.value = contents;
  }

  return {
    editorContents,
    setEditorContents,
  };
}

export default createAppState();
