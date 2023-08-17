import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

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
      base: process.env.NODE_ENV === "production" ? "/raccoon-sql-docs" : ""
    },
    alias: {
      $components: "src/components"
    }
  },
}

export default config
