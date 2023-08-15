# 影像處理相關

本章節在說明 raccoon 如何做到 DICOM 影像轉換成 jpeg 影像以及一些影像處理

另外 raccoon 部分功能是使用 [node-java-bridge](https://github.com/MarkusJx/node-java-bridge) 與 java 混和撰寫，raccoon 如何使用 node-java-bridge 可參考 [node-java-bridge 說明](/guide/developer/node-java-bridge)

## 轉換影像

Raccoon 將 DICOM 影像轉換成 jpeg 影像的功能，主要由 java (dcm4chee) 撰寫的，
- 因為效能問題，所以有包裝成另一個 java project 在進行呼叫使用
    - 專案: [java-dcm2jpg](https://github.com/Chinlinlee/java-dcm2jpg)
    - 包裝的 function 可以:
        - 設定 frameNumber
        - 設定 jpeg quality
        - 設定 window center 以及 window width
        ```java
        public static class Dcm2JpgOptions {
            public String iccProfileName="no"; // 目前不使用，而是透過 imagemagick 修改
            public int frameNumber=1;
            public Number jpgQuality= 1.0;
            public int windowCenter=Integer.MAX_VALUE;
            public int windowWidth=Integer.MAX_VALUE;
            public String format = "JPEG";
        }
        ```
- javascript 範例
```js
const { Dcm2JpgExecutor } = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor");
const { Dcm2JpgExecutor$Dcm2JpgOptions } = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");

let opt = await Dcm2JpgExecutor$Dcm2JpgOptions.newInstanceAsync();

opt.frameNumber = 2;
await Dcm2JpgExecutor.convertDcmToJpgFromFilename("dicomFile", "outputJpegFile", opt);
```

## 影像處理

Raccoon 的一些影像處理如: 裁切、jpeg 影像品質、iccprofile 都是使用 imagemagick 執行的。

### Why imagemagick
:::note[提醒]
以下是為何使用 imagemagick 的小故事，若無興趣，可以忽略
:::

你可能想過，一定有套件可以做到裁切、影像品質修改等等的影像處理，為何要使用 imagemagick?
