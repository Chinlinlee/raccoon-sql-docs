import { defineConfig } from 'vite'
import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'
import myDotenvConfig from "@raccoon-docs/core/src/libs/dotenv.js";
import versionNavbar from '@raccoon-docs/core/src/libs/versionNavbar.js';

myDotenvConfig();

if (process.env.BASE_URL === undefined || process.env.BASE_URL === null) {
  throw new Error('BASE_URL environment variable is not set');
}

if (process.env.VERSION_PAGE_BASE_URL === undefined || process.env.VERSION_PAGE_BASE_URL === null) {
  throw new Error('VERSION_PAGE_BASE_URL environment variable is not set');
}

const base = process.env.NODE_ENV === "production" ? process.env.BASE_URL + "/v2-2-0" : "";

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        navbar: [
          // Add your navbar configs here
          {
            "title": "Guide",
            "to": `${base}/guide/getting-started/installation-debian/`
          },
          {
            ...versionNavbar
          }
        ],
        sidebar: {
          // Add your sidebar configs here
          [`${base}/guide/`]: [
            {
              title: "Getting Started",
              collapsible: true,
              items: [
                {
                  title: "Installation - Debian Linux",
                  to: `/guide/getting-started/installation-debian/`
                }
              ]
            },
            {
              title: "開發人員",
              collapsible: true,
              items: [
                {
                  title: "基礎觀念",
                  to: "/guide/developer/foundation/"
                },
                {
                  title: "影像處理相關",
                  to: "/guide/developer/image-processing/"
                },
                {
                  title: "node-java-bridge",
                  to: "/guide/developer/node-java-bridge/"
                },
                {
                  title: "Mongoose Schema",
                  to: "/guide/developer/mongoose-schema/"
                },
                {
                  title: "相依專案",
                  to: "/guide/developer/deps-projects/"
                },
                {
                  title: "Swagger API Docs",
                  to: "/guide/developer/swagger/"
                },
                {
                  title: "SQL",
                  to: "/guide/developer/sql/"
                },
                {
                  title: "DIMSE 服務",
                  to: "/guide/developer/dimse/"
                },
                {
                  title: "Logging System",
                  to: "/guide/developer/logging-system/"
                },
                {
                  title: "OAuth 串接",
                  to: "/guide/developer/oauth/"
                }
              ]
            }
          ]
        },
        github: 'https://github.com/Chinlinlee/raccoon-dicom',
        logo: `${base}/raccoon.png`,
        preBuildIconifyIcons: {
          'vscode-icons': ['file-type-mongo', 'file-type-docker2', 'file-type-node', 'file-type-sequelize']
        },
        highlighter: {
          languages: ['svelte', 'sh', 'js', 'html', 'ts', 'md', 'css', 'scss', 'yaml', 'java', 'ini', 'dockerfile']
        }
      }),
      siteConfig: {
        title: 'Raccoon',
        description: 'mini-PACS for the healthcare',
      },
    }),
  ],
})

export default config
