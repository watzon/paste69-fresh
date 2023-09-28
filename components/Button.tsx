import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Button(
  props:
    | JSX.HTMLAttributes<HTMLButtonElement>
    | JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <>
      {props.href
        ? (
          <a
            {...props as JSX.HTMLAttributes<HTMLAnchorElement>}
            class={`px-2 py-2 text-gray-100 border border-gray-300 hover:bg-teal-800 bg-opacity-30 transition-colors ${props.disabled ? "bg-gray-500 pointer-events-none" : "bg-teal-500"}`}
          />
        )
        : (
          <button
            {...props as JSX.HTMLAttributes<HTMLButtonElement>}
            disabled={!IS_BROWSER || props.disabled}
            class="px-2 py-2 text-gray-100 border border-gray-300 bg-teal-500 hover:bg-teal-800 disabled:bg-gray-500 bg-opacity-30 transition-colors"
          />
        )}
    </>
  );
}
