<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";

    let host = "{host}";
</script>

# getStudyFhir 插件
此插件會為 Raccoon 加入一個新的 API: GET /dicom-web/studies/:studyUID/fhir，用於取得 Study 的 Patient, Endpoint 以及 ImagingStudy Resources。

## 設定檔
- 請修改 `config/plugins/config.js`
```js
module.exports.pluginsConfig = {
    // 省略...
    // 加入以下內容
    getStudyFhir: {
        enable: true,
        before: true,
        routers: []
    }
};
```

## 使用方法
### 上傳檔案
- 首先我們透過 [dicom-faker](https://github.com/Chinlinlee/dicom-faker) 產生 300 筆 instances (study uid 為 2.25.921452385674878785383125926611838343798)
```bash
node index.js -in 300 
```
- 將產生的檔案上傳至 Raccoon
```bash
dcmsend 127.0.0.1 11112 -aec RACCOONQRSCP {DICOM-FAKER_DIR} +sd +r -nuc
```
- 使用 postman 測試 (GET http://127.0.0.1:8081/dicom-web/studies/2.25.921452385674878785383125926611838343798/fhir)

<CenterImage
src="{base}/plugin-list/get-study-fhir/postman.png"
alt="postman demo"
title="postman 測試 demo">
</CenterImage>

- <Link to="{base}/plugin-list/get-study-fhir/example.json" label="查看產生的 json 範例"></Link>