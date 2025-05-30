import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import myDotenvConfig from "@raccoon-docs/core/src/libs/dotenv.js";

myDotenvConfig();

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      pages: 'docs',
    }),
    paths: {
      base: process.env.NODE_ENV === "production" ? process.env.BASE_URL + "/current" : ""
    },
    alias: {
      $components: "src/components",
      $libs: "src/libs",
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path.includes("github.com")) {
          return
        }
        throw new Error(message)
      },
      handleMissingId: "warn"
    }
  },
}

export default config
