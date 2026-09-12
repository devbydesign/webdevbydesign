import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://webdevbydesign.com",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => ![
        "/404/",
        "/author/katrialesser/",
        "/category/uncategorized/",
        "/2023/06/07/hello-world/",
      ].some((path) => page.endsWith(path)),
    }),
  ],
});
