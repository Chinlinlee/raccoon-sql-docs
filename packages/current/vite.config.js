import { defineConfig } from 'vite'
import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'
import { config as dotConfig } from 'dotenv';
dotConfig();

if (process.env.BASE_URL === undefined || process.env.BASE_URL === null) {
  throw new Error('BASE_URL environment variable is not set');
}

if (process.env.VERSION_PAGE_BASE_URL === undefined || process.env.VERSION_PAGE_BASE_URL === null) {
  throw new Error('VERSION_PAGE_BASE_URL environment variable is not set');
}

const base = process.env.NODE_ENV === "production" ? process.env.BASE_URL + "/current" : "";

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        navbar: [
          // Add your navbar configs here
          {
            "title": "Guide",
            "to": `${base}/guide/developer/foundation/`
          },
          {
            "title": "Version",
            "items": [
              {
                "title": "v2.3.0 (current)",
                "to": `${base}/`
              },
              {
                "title": "v2.2.0",
                "to": `${process.env.VERSION_PAGE_BASE_URL}/v2-2-0/`
              }
            ]
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
                },
                {
                  title: "mocha 測試報告",
                  to: `${process.env.VERSION_PAGE_BASE_URL}/current/mocha-report/mochawesome.html`
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
