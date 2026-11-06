import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import { codeToHtml } from "shiki";
import { feedbackSectionsPreprocess } from "./mdsvex-feedback-sections.js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit({
      extensions: [".svelte", ".svx"],
      preprocess: [
        feedbackSectionsPreprocess(),
        mdsvex({
          extensions: [".svx"],
          highlight: {
            highlighter: async (code, lang = "text") => {
              const html = await codeToHtml(code, { lang: lang ?? "text", theme: "github-light" });

              return `{@html ${JSON.stringify(html)}}`;
            }
          }
        })
      ],
      adapter: adapter({ assets: "build", pages: "build", strict: true }),
      paths: { relative: true }
    })
  ]
});
