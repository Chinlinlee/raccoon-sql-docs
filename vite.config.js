import { defineConfig } from 'vite'
import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        navbar: [
          // Add your navbar configs here
        ],
        sidebar: {
          // Add your sidebar configs here
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
