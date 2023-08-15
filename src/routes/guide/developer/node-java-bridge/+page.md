# node-java-bridge

Raccoon 目前有一些功能是與 java 混和撰寫而成。
使用套件為[node-java-bridge](https://github.com/MarkusJx/node-java-bridge)

## 主要檔案
與 dcm4che (java) 相關的都放置於 `models/DICOM/dcm4che`，以下都是以此為 root
- `java-instance.js`: 初始化 java bridge 的檔案 (包含引入 jar 檔)
- `javaNode`: 放置所有 jar 檔的資料夾
- `wrapper`: 放置 `java-ts-definition-generator` 產生的定義檔的資料夾
- `DicomUtf8Converter.js`: 用於修正遺失或錯誤編碼的 DICOM class，會將 DICOM 編碼設定成 utf-8
- `dcm2dcm.js`: 用來轉換 transfer syntax 的 class

## 產生定義檔

本章節將教你 raccoon 的 `Dcm2JpgExecutor` DICOM 影像轉 JPEG 功能是如何嵌入到 nodejs 撰寫，並且提供提示字 (intellisense) 功能的!