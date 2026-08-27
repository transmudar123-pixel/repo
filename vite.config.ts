// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const REPO_NAME = "Web-Oficial";
const BASE_PATH = `/${REPO_NAME}/`;

export default defineConfig({
  vite: {
    base: BASE_PATH,
  },
  // Sin servidor: apagamos nitro y generamos HTML estático de cada ruta (prerender).
  nitro: false,
  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});
