<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";

    let host = "{host}";
    let pageUrl = process.env.VERSION_PAGE_BASE_URL;
</script>

# DICOMDIR 插件

此插件會為 Raccoon 新增一個 `/dicom-web/dicomdir` 的 API，使用者可以透過此 API 取得 DICOMDIR 的資料。

## 設定檔
- 請修改 `plugins/config.js`
```js
module.exports.pluginsConfig = {
    // 省略...
    "dicomdir": {
        enable: true,
        before: true,
        routers: [
            {
                path: "/dicom-web/dicomdir",
                method: "get"
            }
        ]
    },
};
```

## 使用方法

### 取得 DICOMDIR 的資料

- 打開 postman
- 在 `GET` 的 request 中，輸入 `http://{host}/dicom-web/dicomdir?StudyInstanceUID=1.2.826.0.1.3680043.8.1055.1.20111102150758591.92402465.76095170`
  - 這裡使用 StudyInstanceUID 來取得指定 study 的 DICOMDIR 資料
- 點擊 `Send` 按鈕
- 正常會看到回傳 7z 檔案

<CenterImage
    src="{base}/plugin-list/dicomdir/postman-get-dicomdir.png"
    alt="Postman Get DICOMDIR"
    title="Postman Get DICOMDIR">
</CenterImage>

- 打開回傳的 7z 檔案，可以看到裡面有 DICOMDIR 檔案和相關的 DICOM 檔案在 files 資料夾中

<CenterImage
    src="{base}/plugin-list/dicomdir/open-dicomdir-7z.png"
    alt="Open DICOMDIR 7z"
    title="Open DICOMDIR 7z">
</CenterImage>

- 解壓縮後，使用 dcmdump 查看 DICOMDIR 的資料，應該可以看到相對應的 DICOM 檔案路徑出現在 DICOMDIR 資料中
  - 這裡使用的是 dcm4chee 的 dcmdump 工具

<CenterImage
    src="{base}/plugin-list/dicomdir/do-dcmdump.png"
    alt="Do dcmdump"
    title="Do dcmdump">
</CenterImage>
