import { JSX } from "preact";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Button from "../components/Button.tsx";
import IconMoon from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/moon.tsx";
import IconSun from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/sun.tsx";

const modes = ["light", "dark"] as const;
const themes = [
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/nord.min.css",
];

export default function ColorMode(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  const state = useSignal<(typeof modes)[number]>("dark");

  // Set the class on the html element if necessary. Also
  // add the correct highlight.js stylesheet and unload
  // the other one.
  function setTheme(theme: string) {
    const documentElement = document.documentElement;
    const [lightStyle, darkStyle] = themes;
    if (theme === "dark") {
      documentElement.classList.add("dark");
      // Remove the light stylesheet and add the dark one.
      document.head.childNodes.forEach((node) => {
        if (node instanceof HTMLLinkElement) {
          if (node.href === lightStyle) {
            node.remove();
          }
        }
      });
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = darkStyle;
      document.head.appendChild(link);
    } else {
      documentElement.classList.remove("dark");
      // Remove the dark stylesheet and add the light one.
      document.head.childNodes.forEach((node) => {
        if (node instanceof HTMLLinkElement) {
          if (node.href === darkStyle) {
            node.remove();
          }
        }
      });
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = lightStyle;
      document.head.appendChild(link);
    }
  }

  // Detect the user's preferred color scheme using localStorage or
  // the `prefers-color-scheme` media query.
  function detectMode() {
    const mode = localStorage.getItem("mode") as typeof modes[number] | null;
    if (mode) {
      state.value = mode;
    } else {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      if (media.matches) {
        state.value = "dark";
      }
    }

    if (state.value == "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  // Toggle the color scheme between light and dark.
  function toggle() {
    const mode = state.value === "light" ? "dark" : "light";
    state.value = mode;
    localStorage.setItem("mode", mode);
    if (mode == "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  useEffect(detectMode, []);

  return (
    <Button onClick={toggle} {...props}>
      {state.value === "dark" ? <IconMoon /> : <IconSun />}
    </Button>
  );
}
