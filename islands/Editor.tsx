import { useContext } from "preact/hooks";
import { AppState } from "./App.tsx";

export interface EditorProps {
  contents?: string;
}

export default function Editor(props: EditorProps) {
  const { editorContents, setEditorContents } = useContext(AppState);

  if (props.contents) {
    setEditorContents(props.contents);
  }

  const update = (text: string) => {
    setEditorContents(text);
  };

  return (
    <textarea
      value={editorContents}
      class="w-full h-full bg-transparent border-none resize-none outline-none"
      onChange={(e) => update((e.target as HTMLTextAreaElement).value)}
      autoFocus
    />
  );
}
