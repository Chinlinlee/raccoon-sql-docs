
# 基礎觀念

此為開發者的基礎觀念介紹，讓你知道如何去開發 Raccoon

## 專案結構
- `api`: 放置 Web API 相關操作的地方
    - `xxx/controller`: 其中 xxx 為分類名字，而 controller 是放置你 API route 所要做的事情的資料夾
        - `QIDO-RS/xxx.js`: 這是一個 QIDO-RS(分類名稱) controller 的檔案，是用來寫指定 Route API 要執行的動作的地方
        - `xxx.route.js`: 定義路由 (API Path)的地方
- `config`: 放置一些"套件"設定的地方
    - 目前包含 log 以及 dcm4chee QRSCP
- `docs`: 放置說明文件的地方
- `error`: 放置自訂 error class 的地方
- `local`: 放置可本地執行的檔案的地方
    - `dicom-uploader-stow.js`: 使用 STOW-RS 上傳 DICOM 影像的腳本 (建議用此腳本)
    - `dicom-uploader.js`: 使用 Raccoon 內的上傳 function 執行上傳的腳本
- `models`: 放置資料處理的地方
    - `DICOM`: 放置 DICOM 資料處理的地方，裡面關係到資料庫處理的主要資料庫為 MongoDB
        - `dcm4che`: 放置 dcm4che 相關以及 node-java-bridge 程式碼的地方
        - `dcmtk`: 目前已棄用
- `FHIR`: 放置 DICOM 轉 FHIR 相關操作的資料夾
- `magick`: 放置使用 imagemagick 執行影像處理的資料夾
- `mongodb`: 放置 mongodb 資料庫連接、基礎 schema 定義、主要 schema 定義以及相關操作的資料夾
- `plugins`: 放置插件的資料夾
- `services`: 放置全局服務的資料夾 (目前無使用)
- `tempUploadFiles`: 執行上傳時，暫存上傳檔案的資料夾
- `test`: 執行測試的資料夾
- `utils`: 放置通用程式的資料夾
- `routes.js`: 引入且定義所有路由 (API Path)的地方

## DICOMweb
你必須了解基礎 DICOMweb API 路由的操作及定義才好進行 Raccoon DICOMweb PACS server 的開發，以下是一些 DICOMweb 相關的資源

### STOW-RS: 上傳 DICOM 影像 API

- 官方概略定義: [STOW-RS](https://www.dicomstandard.org/using/dicomweb/store-stow-rs)
- 官方詳細定義: [Store Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.5)

:::important[Important title]
STOW-RS 使用的 headers.Content-Type 必須為 multipart/related，而非 multipart/form-data。

**Raccoon 目前使用 `multipart/*` 進行過濾，沒有嚴謹依照此規則，所以可用 multipart/form-data 上傳**

但！！若是你想要在其他 DICOMweb PACS Server 上傳 DICOM 影像的話，請使用 multipart/related
:::

- multipart 結構
    
```text
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=frontier

This is a message with multiple parts in MIME format.
--frontier
Content-Type: text/plain

This is the body of the message.
--frontier
Content-Type: application/octet-stream
Content-Transfer-Encoding: base64

PGh0bWw+CiAgPGhlYWQ+CiAgPC9oZWFkPgogIDxib2R5PgogICAgPHA+VGhpcyBpcyB0aGUg
Ym9keSBvZiB0aGUgbWVzc2FnZS48L3A+CiAgPC9ib2R5Pgo8L2h0bWw+Cg==
--frontier--
```

- 上傳可參考工具:
    - python: [dicomweb-client](https://dicomweb-client.readthedocs.io/en/latest/introduction.html)
    - javascript: [request-compose (back-end)](https://www.npmjs.com/package/request-compose)、[dicomweb-client](https://github.com/dcmjs-org/dicomweb-client)、[form-data + XHR](https://github.com/jimmywarting/FormData)
    - curl: 
    ```bash
    curl --location --request POST "{Service URL}/dicom-web/studies"
    --header "Accept: application/dicom+json"
    --header "Content-Type: multipart/related; type=\"application/dicom\""
    --form "file1=@test.dcm;type=application/dicom"
    --trace-ascii "trace.txt"
    ```

### QIDO-RS: 查詢影像資料

- 官方概略定義: [QIDO-RS](https://www.dicomstandard.org/using/dicomweb/query-qido-rs)
- 官方詳細定義: [Search Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6)
- API 範例: http://example.com/dicom-web/studies?00100010=foo

### WADO-RS: 調閱影像

:::important[Important title]
WADO-RS 回傳資料的 headers.Content-Type 為 multipart/related，必須自行解析，可參照 [dcmjs/src/utilities/Message.js](https://github.com/dcmjs-org/dcmjs/blob/f844e025f86055a918c13269f6d762a711f3a4bf/src/utilities/Message.js#L164)
:::

- 官方概略定義: [WADO-RS](https://www.dicomstandard.org/using/dicomweb/retrieve-wado-rs-and-wado-uri)
- 官方詳細定義: [Retrieve Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4)
- API 範例: http://example.com/dicom-web/studies/1.2.826.0.1.3680043.8.1055.1.20111102150758591.92402465.76095170

### WADO-URI: 調閱影像
此 API 與 WADO-RS 不同的點在於，只取一張影像，且 Content-Type 不會是 multipart/related。

- 官方詳細定義: [Retrieve DICOM Instance Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_9.4)

## Git message 規範
由於 git message 大家寫法都不同，若你是開發者，請參考以下的 git message 寫法規範的文章
- [\[note\] git conventional commit](https://pjchender.dev/npm/note-git-conventional-commit/)
- [約定式提交 Conventional Commits](https://www.cythilya.tw/2021/03/16/conventional-commits/)

### 寫法
```bash
# 類型後接"半形冒號":，冒號後一定要有空白
類型: 概括內容

詳細內容

footer
```
- 範例:
```bash
feat: 更改使用者管理頁面

- icon 放大
- 不顯示使用者 id
等等

from: chin-lin
```
### 類型
- feat：新增或修改功能
- fix：修復 bug
- docs：文件
- style：coding style 的調整，例如：空白、分號、空格等，不影響程式碼的內容
- refactor：重構現有程式碼，不屬於新增新功能或是修 bug，**若你是將某個功能擷取出 function 或 class 請用此類型**
- perf：提升效能的改進
- test：新增或修改測試
- build：和打包或外部依賴相關的修改，例如：npm、gulp、broccoli。
- ci：與 CI 設定檔或 script 相關的修改，例如：Travis、Circle、BrowserStack、SauceLabs。
chore：其他，並且也不會修改原始碼或是測試，例如：storybook 的新增或變更
- revert：回復前一個提交的 commit

## 版本號
- raccoon 使用 [standard-version](https://github.com/conventional-changelog/standard-version) 來產生 changelog
- 主要版本號為 x.y.z
    - 其中 x 為主要版本，通常有大更新 (breaking change) 時才會修改 x
    - y 為次要版本，通常有小更新 (feature) 時才會修改 y
    - z 為 patch 版本，通常有 bug fix 時才會修改 z