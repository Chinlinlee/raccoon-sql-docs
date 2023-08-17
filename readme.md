# raccoon-sql-docs
這是個原本要撰寫 Raccoon SQL 版本的文件的 repo，不過我最後決定改成 Raccoon 的開發 docs


## 撰寫工具
以下是我在寫這份文件所使用的工具，非常感謝這些工具，讓我寫出酷酷的文件網站
- VS Code
- [sveltepress](https://github.com/SveltePress/sveltepress)

## 建置

### 1) 更改 config 中的 path.base 
`kit.paths.base` should be your repo URL subpath (see the [Vite docs](https://vitejs.dev/guide/static-deploy.html#github-pages)). In the example below, replace /sveltekit-gh-pages with your repository name.

```diff
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
+   paths: {
+     base: process.env.NODE_ENV === "production" ? "/sveltekit-gh-pages" : "",
+   },
  },
};

export default config;

```

**Note**: You will also need to prepend relative paths with the SvelteKit base path so that your app can build successfully for production.

```svelte
<script>
  import { base } from "$app/paths";
</script>

<a href="{base}/about">About</a>
```
### 2) 在所有擁有相對路徑的檔案新增 base
- 由於使用了 base 修正在 github page 中，會有 base url 的問題
- 所以我們必須在所有擁有相對路徑的檔案新增 base

#### vite.config.js
- 在 vite.config.js 中必須宣告你的 base 路徑，並加入到各路徑當中
```diff
import { defineConfig } from 'vite'
import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'
+    const base = process.env.NODE_ENV === "production" ? "/your-repo" : "";

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        navbar: [
          // Add your navbar configs here
          {
            "title": "Guide",
+            "to": `${base}/guide/developer/foundation/`
          }
        ],
        sidebar: {
          // Add your sidebar configs here
+          [`${base}/guide/`]: [
            {
              title: "Foundation",
              collapsible: true,
              items: [
                {
                  title: "foundation",
                  to: "/guide/foundation/"
                }
              ]
            }
          ]
        },
        github: 'https://github.com/',
+        logo: `${base}/logo.png`,
        preBuildIconifyIcons: {
          'vscode-icons': ['file-type-mongo', 'file-type-docker2', 'file-type-node']
        }
      }),
      siteConfig: {
        title: 'repo',
        description: 'example svelte press site',
      },
    }),
  ],
})

export default config

```

#### 其餘檔案
```diff
<script>
    import { base } from "$app/paths";
</script>
...

## h2 title

+  <img src="{base}/foundation/controller.png" class="rounded-t h-72 w-full object-scale-down">

...
```


### 3) 在 `/static` 資料夾中新增 `.nojekyll` 檔案
The last step is to add an empty `.nojekyll` file to the static folder to [bypass Jekyll on GitHub Pages](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/). SvelteKit will copy static assets to the final build folder.