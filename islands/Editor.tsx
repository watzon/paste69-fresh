import { editorContents } from "../utils/state.ts";

export interface EditorProps {
  contents?: string;
}

export default function Editor(props: EditorProps) {
  if (props.contents) {
    editorContents.value = props.contents;
  }

  const update = (text: string) => {
    editorContents.value = text;
  };

  return (
    <textarea
      class="flex flex-col w-full h-full bg-transparent px-2 pt-4 border-none resize-none outline-none"
      value={editorContents.value}
      onInput={(e) => update((e.target as HTMLTextAreaElement).value)}
      autoFocus
    />
  );
}
