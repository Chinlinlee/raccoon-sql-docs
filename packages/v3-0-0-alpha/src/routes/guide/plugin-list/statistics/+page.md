<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";
</script>

# Statistic 使用量分析插件
此插件會為 Raccoon 加入綜合使用量分析的 API (/dicom-web/stat/full)，主要透過 fluentd 收集至 MongoDB 的日誌進行分析

## 設定檔
- 請修改 `plugins/config.js`
- 插件名稱: `statistic-mongodb`
```js
module.exports.pluginsConfig = {
    // 省略...
    // 加入以下內容
    "statistic-mongodb": {
        enable: true,
        before: true,
        routers: [],
        mongodb: {
            hosts: ["127.0.0.1"],
            ports: [27017],
            dbName: "raccoon-logs",
            urlOptions: "",
            user: "root",
            password: "root",
            authSource: "admin"
        }
    }
};
```

### 設定值說明
| 欄位名稱 | 描述 |
| --- | --- |
| mongodb.hosts | mongodb 連接的 hosts |
| mongodb.ports | mongodb 連接的 hosts 對應的 ports |
| mongodb.dbName | mongodb 連接的資料庫名稱 |
| mongodb.urlOptions | mongodb 額外的 url options 設定 |
| mongodb.user | mongodb 連接的使用者名稱 |
| mongodb.password | mongodb 連接的使用者密碼 |
| mongodb.authSource | mongodb 連接時，驗證帳號密碼的資料庫 |

## 測試案例
- 使用 postman 呼叫 GET http://127.0.0.1:8081/dicom-web/stat/full

<CenterImage
    src="{base}/plugin-list/statistics/postman-test.png"
    alt="postman test"
    title="postman 測試"
/>
