<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";
</script>

# 如何測試

## Unit/Integration Test
這章節將說明，如何進行 Raccoon 的 unit/integration test

:::info[測試材料]
- 資料庫測試使用 memory sqlite
- 測試都以 inject api 為主 (類似模擬 e2e test)
:::

### 前置作業
- 安裝 java
- 安裝 dcmtk
- 安裝 imagemagick
- 複製 `libclib_jiio.so` 以及 `libopencv_java.so` 到 `JAVA_HOME/lib` 資料夾，你可以在 `models/dcm4che/lib/linux-x86-64` 找到這兩個檔案
```bash
# linux
sudo cp ./models/dcm4che/lib/linux-x86-64/*.so /usr/lib/jvm/java-17-openjdk-amd64/lib
```

:::tip[tip]
- 如果你是 linux 可以透過以下指令找到 java home
```bash
readlink -f `which java`
```
:::

### 設定 .env
- 因為測試時，某些程序會用到 env 的設定，請先設定好 .env
- 最重要的是 `DICOM_STORE_ROOTPATH` 儲存位置
  - 預設為 `/dicomFiles`，在 linux 系統上因為是在 root 目錄下，會出現 `permission denied` 的錯誤


### 安裝依賴套件
- 輸入以下指令安裝依賴套件
```bash
npm install
```
- 安裝完畢後，若你是 linux 環境，請更改 7za 的權限
```bash
sudo chmod u+x ./node_modules/7zip-bin/linux/x64/7za
```


### 運行測試
:::warning[注意事項]
在測試前，務必將 plugins 的 config 內所有 enable 改為 false，避免出現測試失敗的問題，尤其是驗證相關的 plugin
:::
- 輸入以下指令運行測試
```
npm run test
```

### 產生 mochawesome
- raccoon 有使用到 [mochawesome](https://www.npmjs.com/package/mochawesome)，產生測試內容的報告
- 輸入以下指令運行測試並產生 mochawesome 的報告
```
npm run test:report
```

- 產生的報告會在 `./mochawesome-report` 資料夾

### 產生 coverage
- raccoon 有使用到 [nyc](https://www.npmjs.com/package/nyc)，產生 coverage 的報告
- 輸入以下指令產生 coverage
```
npm run test:coverage
```

- 產生的報告會在 `./coverage` 資料夾


