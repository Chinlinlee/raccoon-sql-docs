<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";

    let host = "{host}";
    let pageUrl = process.env.VERSION_PAGE_BASE_URL;
</script>

# Asus Web Storage 插件
此插件將 Raccoon 的儲存、下載、刪除相關影像檔案操作功能，轉換到 Asus Web Storage 的 API 上。
也就是說影像會持久儲存在 Asus Web Storage 上，而不是 Raccoon 的本地端。

## 設定檔
- 請修改 `plugins/config.js`
```js
module.exports.pluginsConfig = {
    // 省略...
    // 加入以下內容
    asusWebStorage: {
        enable: true, // 是否啟用此插件
        before: true, // 必須為 true，代表在 controller 層前執行
        routers: [
            {
                path: "/dicom-web/*",
                method: "*",
            }
        ],
        config: {
            sid: "asus web storage 提供的開發 sid",
            programKey: "asus web storage 提供的開發 programKey",
            webStorageHostName: "asus web storage 提供的連接至 web storage 的網址, e.g. asuscloudportal01.asuswebstorage.com",
            sso: {
                jwtSecret: "sso 的 jwt secret, 建議至少 16 碼",
            }
        }
    }
};
```

## 使用方法

- 這裡附上 [Postman Collection](/plugin-list/asus-web-storage/Raccoon-Asus-Web-Storage.postman_collection.json)，請將此 collection 匯入至 Postman 中，並進行相關的 API 測試

<CenterImage 
    src="{base}/plugin-list/asus-web-storage/postman-structure.png"
    alt="postman structure"
    title="postman 結構"
/>

:::info
- 在 `Collection Pre Script` 中，會進行登入的動作，所以在任何的 request 進行前都會先執行登入的動作
:::

### 上傳影像
以下將以「上傳影像」為例，正常來說，當你上傳影像時，會產生 3 種檔案，分別為：
1. DICOM 檔案
2. metadata json 檔案
3. bulk data binary 檔案

以上 3 種，只有第一種 DICOM 檔案會被儲存在 Asus Web Storage 上，其他兩種則不會

接下來，我們進行上傳影像的動作

- 點擊 `Raccoon Asus Web Storage` collection
- 切換到 Variables 分頁
- 填入 `awsUsername` 和 `awsPassword`

<CenterImage
    src="{base}/plugin-list/asus-web-storage/postman-enter-variables.png"
    alt="postman enter variables"
    title="輸入帳號密碼參數"
/>

- 切換到 `Store Instance` request
- 點擊 `Send` 按鈕

<CenterImage
    src="{base}/plugin-list/asus-web-storage/postman-go-to-store-instance.png"
    alt="postman go to store instance"
    title="前往「上傳影像」請求"
/>

- 上傳成功後的結果如下:

<CenterImage
    src="{base}/plugin-list/asus-web-storage/postman-upload-succeed.png"
    alt="postman store instance succeed"
    title="上傳成功回傳結果"
/>

- 接著我們去 Asus Web Storage 上查看，你會看到 `RACCOON_PACS` 這個資料夾，雙擊點進去後，就可以看到剛剛上傳的影像囉！

<CenterImage
    src="{base}/plugin-list/asus-web-storage/asus-aws-result-page.png"
    alt="asus web storage upload result page"
    title="Asus Web Storage 上傳結果頁面"
/>





