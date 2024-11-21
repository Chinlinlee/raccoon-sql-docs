<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";
    import CardList from "@raccoon-docs/core/src/components/card-list.svelte";

    let dcm4cheJpegs = [
        {
            title: "yes",
            src: base + "/image-processing/dcm4che.jpg"
        },
        {
            title: "srgb",
            src: base + "/image-processing/dcm4che-srgb.jpg"
        },
        {
            title: "adobergb",
            src: base + "/image-processing/dcm4che-adobergb.jpg"
        },
        {
            title: "rommrgb",
            src: base + "/image-processing/dcm4che-rommrgb.jpg"
        }
    ];

    let sharpJpegs = [
        {
            title: "yes",
            src: base + "/QQ.avif"
        },
        {
            title: "srgb",
            src: base + "/image-processing/sharp-srgb.jpg"
        },
        {
            title: "adobergb",
            src: base + "/image-processing/sharp-adobergb.jpg"
        },
        {
            title: "rommrgb",
            src: base + "/image-processing/sharp-rommrgb.jpg"
        }
    ];

    let raccoonJpegs = [
        {
            title: "yes",
            src: base + "/image-processing/raccoon-dicom-yes.jpeg"
        },
        {
            title: "srgb",
            src: base + "/image-processing/raccoon-dicom-srgb.jpg"
        },
        {
            title: "adobergb",
            src: base + "/image-processing/raccoon-dicom-adobergb.jpeg"
        },
        {
            title: "rommrgb",
            src: base + "/image-processing/raccoon-dicom-rommrgb.jpg"
        }
    ];

    let gimpJpegs = [
        {
            title: "yes",
            src: base + "/image-processing/GIMP-yes.jpg"
        },
        {
            title: "srgb",
            src: base + "/image-processing/GIMP-srgb.jpg"
        },
        {
            title: "adobergb",
            src: base + "/image-processing/GIMP-adobergb.jpg"
        },
        {
            title: "rommrgb",
            src: base + "/image-processing/GIMP-rommrgb.jpg"
        }
    ];
</script>

# 影像處理相關

本章節在說明 raccoon 如何做到 DICOM 影像轉換成 jpeg 影像以及一些影像處理

另外 raccoon 部分功能是使用 [node-java-bridge](https://github.com/MarkusJx/node-java-bridge) 與 java 混和撰寫，raccoon 如何使用 node-java-bridge 可參考 [node-java-bridge 說明](/guide/developer/node-java-bridge)

## 轉換影像

Raccoon 將 DICOM 影像轉換成 jpeg 影像的功能，主要由 java (dcm4chee) 撰寫的，

-   因為效能問題，所以有包裝成另一個 java project 在進行呼叫使用
    -   專案: [java-dcm2jpg](https://github.com/Chinlinlee/java-dcm2jpg)
    -   包裝的 function 可以:
        -   設定 frameNumber
        -   設定 jpeg quality
        -   設定 window center 以及 window width
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
-   javascript 範例

```js
const {
    Dcm2JpgExecutor
} = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor");
const {
    Dcm2JpgExecutor$Dcm2JpgOptions
} = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");

let opt = await Dcm2JpgExecutor$Dcm2JpgOptions.newInstanceAsync();

opt.frameNumber = 2;
await Dcm2JpgExecutor.convertDcmToJpgFromFilename(
    "dicomFile",
    "outputJpegFile",
    opt
);
```

## 影像處理

Raccoon 的一些影像處理如: 裁切、jpeg 影像品質、iccprofile 都是使用 imagemagick 執行的。

### Why imagemagick

:::note[提醒]
以下是為何使用 imagemagick 的小故事，若無興趣，可以忽略
:::

你可能想過，一定有套件可以做到裁切、影像品質修改等等的影像處理，為何要使用 imagemagick?

這是因為當時在實作 icc profile (色彩管理檔案) 時，所發現的問題，我使用了 dcm4che、node.js sharp 套件、imagemagick 以及 GIMP 套用 icc profile，各工具所產生的結果，不盡相同，以下將一一說明。

不過重點是靠北，GIMP 與 imagemagick 的套用結果相同，所以選擇了 imagemagick。

#### 原圖

這是測試所用的原圖
<CenterImage src="{base}/image-processing/original.jpg" alt="Test Original Image" title="測試原圖"></CenterImage>

下面將使用以下 iccprofile 的參數進行測試

- yes
- srgb
- adobergb
- rommrgb


:::info[icc profile 檔案來源]
基礎 icc profile 色彩檔可以從 dcm4che 的 github 網站取得，[dcm4che-image/src/main/resources/org/dcm4che3/image](https://github.com/dcm4che/dcm4che/tree/master/dcm4che-image/src/main/resources/org/dcm4che3/image)
:::

#### dcm4che

<CardList items={dcm4cheJpegs} />

#### Node.js sharp
:::note
由於 sharp 在使用 yes 時，出現錯誤，所以只有 3 個測試結果圖
:::

<CardList items={sharpJpegs} />

#### imagemagick

<CardList items={raccoonJpegs} />

#### GIMP

<CardList items={gimpJpegs} />