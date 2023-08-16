import { defineConfig } from 'vite'
import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        navbar: [
          // Add your navbar configs here
          {
            "title": "Guide",
            "to": "/guide/developer/foundation/"
          }
        ],
        sidebar: {
          // Add your sidebar configs here
          "/guide/": [
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
                }
              ]
            }
          ]
        },
        github: 'https://github.com/Chinlinlee/raccoon-dicom',
        logo: '/raccoon.png',
        preBuildIconifyIcons: {
          'vscode-icons': ['file-type-mongo', 'file-type-docker2', 'file-type-node']
        }
      }),
      siteConfig: {
        title: 'Raccoon',
        description: 'NoSQL-MongoDB-based mini-PACS for the healthcare',
      },
    }),
  ],
})

export default config
