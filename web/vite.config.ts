import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";
import { codeToHtml } from "shiki";
import { defineConfig } from "vite";
import { feedbackSectionsPreprocess } from "./mdsvex-feedback-sections.js";

export default defineConfig({
  plugins: [
    sveltekit({
      extensions: [".svelte", ".svx"],
      adapter: adapter({
        assets: "build",
        pages: "build",
        strict: true,
      }),
      paths: {
        relative: true,
      },
      preprocess: [
        feedbackSectionsPreprocess(),
        mdsvex({
          extensions: [".svx"],
          highlight: {
            highlighter: async (code, lang = "text") => {
              const html = await codeToHtml(code, {
                lang,
                theme: "github-light",
              });
              return `{@html ${JSON.stringify(html)}}`;
            },
          },
        }),
      ],
    }),
  ],
});
