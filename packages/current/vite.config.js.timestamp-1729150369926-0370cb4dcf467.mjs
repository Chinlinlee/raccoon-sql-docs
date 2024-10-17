// vite.config.js
import { defineConfig } from "file:///D:/work-space/code/raccoon-space/raccoon-sql-docs/node_modules/.pnpm/vite@5.4.9_@types+node@20.16.11_terser@5.35.0/node_modules/vite/dist/node/index.js";
import { sveltepress } from "file:///D:/work-space/code/raccoon-space/raccoon-sql-docs/node_modules/.pnpm/@sveltepress+vite@0.35.0_@babel+core@7.25.8_@sveltejs+kit@2.7.1_@sveltejs+vite-plugin-svelte@_yp3j6rsf34slcow2x62l7jnfhi/node_modules/@sveltepress/vite/dist/index.mjs";
import { defaultTheme } from "file:///D:/work-space/code/raccoon-space/raccoon-sql-docs/node_modules/.pnpm/@sveltepress+theme-default@3.1.0_@algolia+client-search@4.24.0_@sveltejs+kit@2.7.1_@sveltejs+_hf7svo4hcsywi7qau3aavlk3qq/node_modules/@sveltepress/theme-default/dist/index.js";
import { config as dotConfig } from "file:///D:/work-space/code/raccoon-space/raccoon-sql-docs/node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/main.js";
dotConfig();
if (process.env.BASE_URL === void 0 || process.env.BASE_URL === null) {
  throw new Error("BASE_URL environment variable is not set");
}
if (process.env.VERSION_PAGE_BASE_URL === void 0 || process.env.VERSION_PAGE_BASE_URL === null) {
  throw new Error("VERSION_PAGE_BASE_URL environment variable is not set");
}
var base = process.env.NODE_ENV === "production" ? process.env.BASE_URL + "/current" : "";
var config = defineConfig({
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
                "title": "v2.2.0 (current)",
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
              title: "\u958B\u767C\u4EBA\u54E1",
              collapsible: true,
              items: [
                {
                  title: "\u57FA\u790E\u89C0\u5FF5",
                  to: "/guide/developer/foundation/"
                },
                {
                  title: "\u5F71\u50CF\u8655\u7406\u76F8\u95DC",
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
                  title: "\u76F8\u4F9D\u5C08\u6848",
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
                  title: "DIMSE \u670D\u52D9",
                  to: "/guide/developer/dimse/"
                },
                {
                  title: "Logging System",
                  to: "/guide/developer/logging-system/"
                },
                {
                  title: "OAuth \u4E32\u63A5",
                  to: "/guide/developer/oauth/"
                }
              ]
            }
          ]
        },
        github: "https://github.com/Chinlinlee/raccoon-dicom",
        logo: `${base}/raccoon.png`,
        preBuildIconifyIcons: {
          "vscode-icons": ["file-type-mongo", "file-type-docker2", "file-type-node", "file-type-sequelize"]
        },
        highlighter: {
          languages: ["svelte", "sh", "js", "html", "ts", "md", "css", "scss", "yaml", "java", "ini", "dockerfile"]
        }
      }),
      siteConfig: {
        title: "Raccoon",
        description: "mini-PACS for the healthcare"
      }
    })
  ]
});
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrLXNwYWNlXFxcXGNvZGVcXFxccmFjY29vbi1zcGFjZVxcXFxyYWNjb29uLXNxbC1kb2NzXFxcXHBhY2thZ2VzXFxcXGN1cnJlbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmstc3BhY2VcXFxcY29kZVxcXFxyYWNjb29uLXNwYWNlXFxcXHJhY2Nvb24tc3FsLWRvY3NcXFxccGFja2FnZXNcXFxcY3VycmVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay1zcGFjZS9jb2RlL3JhY2Nvb24tc3BhY2UvcmFjY29vbi1zcWwtZG9jcy9wYWNrYWdlcy9jdXJyZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgc3ZlbHRlcHJlc3MgfSBmcm9tICdAc3ZlbHRlcHJlc3Mvdml0ZSdcclxuaW1wb3J0IHsgZGVmYXVsdFRoZW1lIH0gZnJvbSAnQHN2ZWx0ZXByZXNzL3RoZW1lLWRlZmF1bHQnXHJcbmltcG9ydCB7IGNvbmZpZyBhcyBkb3RDb25maWcgfSBmcm9tICdkb3RlbnYnO1xyXG5kb3RDb25maWcoKTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5CQVNFX1VSTCA9PT0gdW5kZWZpbmVkIHx8IHByb2Nlc3MuZW52LkJBU0VfVVJMID09PSBudWxsKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdCQVNFX1VSTCBlbnZpcm9ubWVudCB2YXJpYWJsZSBpcyBub3Qgc2V0Jyk7XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5WRVJTSU9OX1BBR0VfQkFTRV9VUkwgPT09IHVuZGVmaW5lZCB8fCBwcm9jZXNzLmVudi5WRVJTSU9OX1BBR0VfQkFTRV9VUkwgPT09IG51bGwpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoJ1ZFUlNJT05fUEFHRV9CQVNFX1VSTCBlbnZpcm9ubWVudCB2YXJpYWJsZSBpcyBub3Qgc2V0Jyk7XHJcbn1cclxuXHJcbmNvbnN0IGJhc2UgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBwcm9jZXNzLmVudi5CQVNFX1VSTCArIFwiL2N1cnJlbnRcIiA6IFwiXCI7XHJcblxyXG5jb25zdCBjb25maWcgPSBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHN2ZWx0ZXByZXNzKHtcclxuICAgICAgdGhlbWU6IGRlZmF1bHRUaGVtZSh7XHJcbiAgICAgICAgbmF2YmFyOiBbXHJcbiAgICAgICAgICAvLyBBZGQgeW91ciBuYXZiYXIgY29uZmlncyBoZXJlXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwidGl0bGVcIjogXCJHdWlkZVwiLFxyXG4gICAgICAgICAgICBcInRvXCI6IGAke2Jhc2V9L2d1aWRlL2RldmVsb3Blci9mb3VuZGF0aW9uL2BcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwidGl0bGVcIjogXCJWZXJzaW9uXCIsXHJcbiAgICAgICAgICAgIFwiaXRlbXNcIjogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJ2Mi4yLjAgKGN1cnJlbnQpXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvXCI6IGAke2Jhc2V9L2BcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJ2Mi4yLjBcIixcclxuICAgICAgICAgICAgICAgIFwidG9cIjogYCR7cHJvY2Vzcy5lbnYuVkVSU0lPTl9QQUdFX0JBU0VfVVJMfS92Mi0yLTAvYFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2lkZWJhcjoge1xyXG4gICAgICAgICAgLy8gQWRkIHlvdXIgc2lkZWJhciBjb25maWdzIGhlcmVcclxuICAgICAgICAgIFtgJHtiYXNlfS9ndWlkZS9gXTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IFwiR2V0dGluZyBTdGFydGVkXCIsXHJcbiAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5zdGFsbGF0aW9uIC0gRGViaWFuIExpbnV4XCIsXHJcbiAgICAgICAgICAgICAgICAgIHRvOiBgL2d1aWRlL2dldHRpbmctc3RhcnRlZC9pbnN0YWxsYXRpb24tZGViaWFuL2BcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aXRsZTogXCJcdTk1OEJcdTc2N0NcdTRFQkFcdTU0RTFcIixcclxuICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJcdTU3RkFcdTc5MEVcdTg5QzBcdTVGRjVcIixcclxuICAgICAgICAgICAgICAgICAgdG86IFwiL2d1aWRlL2RldmVsb3Blci9mb3VuZGF0aW9uL1wiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJcdTVGNzFcdTUwQ0ZcdTg2NTVcdTc0MDZcdTc2RjhcdTk1RENcIixcclxuICAgICAgICAgICAgICAgICAgdG86IFwiL2d1aWRlL2RldmVsb3Blci9pbWFnZS1wcm9jZXNzaW5nL1wiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJub2RlLWphdmEtYnJpZGdlXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRvOiBcIi9ndWlkZS9kZXZlbG9wZXIvbm9kZS1qYXZhLWJyaWRnZS9cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTW9uZ29vc2UgU2NoZW1hXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRvOiBcIi9ndWlkZS9kZXZlbG9wZXIvbW9uZ29vc2Utc2NoZW1hL1wiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJcdTc2RjhcdTRGOURcdTVDMDhcdTY4NDhcIixcclxuICAgICAgICAgICAgICAgICAgdG86IFwiL2d1aWRlL2RldmVsb3Blci9kZXBzLXByb2plY3RzL1wiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJTd2FnZ2VyIEFQSSBEb2NzXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRvOiBcIi9ndWlkZS9kZXZlbG9wZXIvc3dhZ2dlci9cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU1FMXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRvOiBcIi9ndWlkZS9kZXZlbG9wZXIvc3FsL1wiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJESU1TRSBcdTY3MERcdTUyRDlcIixcclxuICAgICAgICAgICAgICAgICAgdG86IFwiL2d1aWRlL2RldmVsb3Blci9kaW1zZS9cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTG9nZ2luZyBTeXN0ZW1cIixcclxuICAgICAgICAgICAgICAgICAgdG86IFwiL2d1aWRlL2RldmVsb3Blci9sb2dnaW5nLXN5c3RlbS9cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiT0F1dGggXHU0RTMyXHU2M0E1XCIsXHJcbiAgICAgICAgICAgICAgICAgIHRvOiBcIi9ndWlkZS9kZXZlbG9wZXIvb2F1dGgvXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdpdGh1YjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9DaGlubGlubGVlL3JhY2Nvb24tZGljb20nLFxyXG4gICAgICAgIGxvZ286IGAke2Jhc2V9L3JhY2Nvb24ucG5nYCxcclxuICAgICAgICBwcmVCdWlsZEljb25pZnlJY29uczoge1xyXG4gICAgICAgICAgJ3ZzY29kZS1pY29ucyc6IFsnZmlsZS10eXBlLW1vbmdvJywgJ2ZpbGUtdHlwZS1kb2NrZXIyJywgJ2ZpbGUtdHlwZS1ub2RlJywgJ2ZpbGUtdHlwZS1zZXF1ZWxpemUnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlnaGxpZ2h0ZXI6IHtcclxuICAgICAgICAgIGxhbmd1YWdlczogWydzdmVsdGUnLCAnc2gnLCAnanMnLCAnaHRtbCcsICd0cycsICdtZCcsICdjc3MnLCAnc2NzcycsICd5YW1sJywgJ2phdmEnLCAnaW5pJywgJ2RvY2tlcmZpbGUnXVxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIHNpdGVDb25maWc6IHtcclxuICAgICAgICB0aXRsZTogJ1JhY2Nvb24nLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnbWluaS1QQUNTIGZvciB0aGUgaGVhbHRoY2FyZScsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1ksU0FBUyxvQkFBb0I7QUFDbmEsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxVQUFVLGlCQUFpQjtBQUNwQyxVQUFVO0FBRVYsSUFBSSxRQUFRLElBQUksYUFBYSxVQUFhLFFBQVEsSUFBSSxhQUFhLE1BQU07QUFDdkUsUUFBTSxJQUFJLE1BQU0sMENBQTBDO0FBQzVEO0FBRUEsSUFBSSxRQUFRLElBQUksMEJBQTBCLFVBQWEsUUFBUSxJQUFJLDBCQUEwQixNQUFNO0FBQ2pHLFFBQU0sSUFBSSxNQUFNLHVEQUF1RDtBQUN6RTtBQUVBLElBQU0sT0FBTyxRQUFRLElBQUksYUFBYSxlQUFlLFFBQVEsSUFBSSxXQUFXLGFBQWE7QUFFekYsSUFBTSxTQUFTLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsTUFDVixPQUFPLGFBQWE7QUFBQSxRQUNsQixRQUFRO0FBQUE7QUFBQSxVQUVOO0FBQUEsWUFDRSxTQUFTO0FBQUEsWUFDVCxNQUFNLEdBQUcsSUFBSTtBQUFBLFVBQ2Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUDtBQUFBLGdCQUNFLFNBQVM7QUFBQSxnQkFDVCxNQUFNLEdBQUcsSUFBSTtBQUFBLGNBQ2Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsU0FBUztBQUFBLGdCQUNULE1BQU0sR0FBRyxRQUFRLElBQUkscUJBQXFCO0FBQUEsY0FDNUM7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQTtBQUFBLFVBRVAsQ0FBQyxHQUFHLElBQUksU0FBUyxHQUFHO0FBQUEsWUFDbEI7QUFBQSxjQUNFLE9BQU87QUFBQSxjQUNQLGFBQWE7QUFBQSxjQUNiLE9BQU87QUFBQSxnQkFDTDtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE9BQU87QUFBQSxjQUNQLGFBQWE7QUFBQSxjQUNiLE9BQU87QUFBQSxnQkFDTDtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE9BQU87QUFBQSxrQkFDUCxJQUFJO0FBQUEsZ0JBQ047QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxRQUFRO0FBQUEsUUFDUixNQUFNLEdBQUcsSUFBSTtBQUFBLFFBQ2Isc0JBQXNCO0FBQUEsVUFDcEIsZ0JBQWdCLENBQUMsbUJBQW1CLHFCQUFxQixrQkFBa0IscUJBQXFCO0FBQUEsUUFDbEc7QUFBQSxRQUNBLGFBQWE7QUFBQSxVQUNYLFdBQVcsQ0FBQyxVQUFVLE1BQU0sTUFBTSxRQUFRLE1BQU0sTUFBTSxPQUFPLFFBQVEsUUFBUSxRQUFRLE9BQU8sWUFBWTtBQUFBLFFBQzFHO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxZQUFZO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDO0FBRUQsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
