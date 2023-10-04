import { extensionMap, languages } from "./languages.ts";
import hljs from "https://esm.sh/highlight.js@11.8.0/lib/core";

const autoLanguages = [
  "js",
  "ts",
  "css",
  "html",
  "json",
  "md",
  "php",
  "py",
  "rb",
  "rs",
  "shell",
];

for (const [lang, exts] of Object.entries(extensionMap)) {
  if (exts.length > 0) {
    // Remove leading underscore, replace other underscores with dashes
    const name = lang.replace(/^_/, "").replace(/_/g, "-");
    // @ts-ignore: this is fine
    hljs.registerLanguage(name, languages[lang]!);
    hljs.registerAliases(exts, { languageName: lang });
  }
}

export const detectLanguage = (code: string) => {
    return hljs.highlightAuto(code, autoLanguages).language;
};

export const highlight = (code: string, lang: string | undefined = undefined) => {
  if (!lang) {
    return hljs.highlightAuto(code, autoLanguages).value;
  } else {
    return hljs.highlight(code, { language: lang }).value;
  }
};
