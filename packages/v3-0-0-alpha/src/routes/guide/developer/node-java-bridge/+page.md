<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";
</script>

# node-java-bridge

Raccoon 目前有一些功能是與 java 混和撰寫而成。
使用套件為 [node-java-bridge](https://github.com/MarkusJx/node-java-bridge)

## 主要檔案
與 dcm4che (java) 相關的都放置於 `models/DICOM/dcm4che`，以下皆以此路徑為 root
- `java-instance.js`: 初始化 java bridge 的檔案 (包含引入 jar 檔)
- `javaNode`: 放置所有 jar 檔的資料夾
- `wrapper`: 放置 `java-ts-definition-generator` 產生的定義檔的資料夾
- `DicomUtf8Converter.js`: 用於修正遺失或錯誤編碼的 DICOM class，會將 DICOM 編碼設定成 utf-8
- `dcm2dcm.js`: 用來轉換 transfer syntax 的 class

## 產生定義檔

本章節將教你 raccoon 的 `Dcm2JpgExecutor` DICOM 影像轉 JPEG 功能是如何嵌入到 nodejs 撰寫，並且提供提示字 (intellisense) 功能的!
- 使用專案: [java-dcm2jpg](https://github.com/Chinlinlee/java-dcm2jpg)
- 請先自行創建一個空的 npm 專案 (npm init)
- 必要 npm 套件
    - typescript (global)
    - node-java-bridge
    - java-ts-definition-generator (global)
    - @types/node (dev)

### 取得 Deps jar 
- 在進行某個 java class 的定義檔匯出前，你可以使用 jdeps 來取得所有依賴的 jar 檔案
- 你可以使用下列命令來取得所有依賴的 jar 檔案
```bash
jdeps -dotoutput ./output dcm2jpg.jar
```
- 執行結果 `output/dcm2jpg.jar.dot` 內容:
```text
digraph "dcm2jpg.jar" {
    // Path: dcm2jpg.jar
   "org.github.chinlinlee.dcm2jpg"                    -> "java.awt.image (java.desktop)";
   "org.github.chinlinlee.dcm2jpg"                    -> "java.io (java.base)";
   "org.github.chinlinlee.dcm2jpg"                    -> "java.lang (java.base)";
   "org.github.chinlinlee.dcm2jpg"                    -> "java.lang.invoke (java.base)";
   "org.github.chinlinlee.dcm2jpg"                    -> "java.text (java.base)";
   "org.github.chinlinlee.dcm2jpg"                    -> "java.util (java.base)";
   "org.github.chinlinlee.dcm2jpg"                    -> "java.util.function (java.base)";
   "org.github.chinlinlee.dcm2jpg"                    -> "java.util.stream (java.base)";
   "org.github.chinlinlee.dcm2jpg"                    -> "javax.imageio (java.desktop)";
   "org.github.chinlinlee.dcm2jpg"                    -> "javax.imageio.metadata (java.desktop)";
   "org.github.chinlinlee.dcm2jpg"                    -> "javax.imageio.stream (java.desktop)";
   "org.github.chinlinlee.dcm2jpg"                    -> "org.apache.commons.cli (not found)";
   "org.github.chinlinlee.dcm2jpg"                    -> "org.dcm4che3.data (not found)";
   "org.github.chinlinlee.dcm2jpg"                    -> "org.dcm4che3.image (not found)";
   "org.github.chinlinlee.dcm2jpg"                    -> "org.dcm4che3.imageio.plugins.dcm (not found)";
   "org.github.chinlinlee.dcm2jpg"                    -> "org.dcm4che3.io (not found)";
   "org.github.chinlinlee.dcm2jpg"                    -> "org.dcm4che3.tool.common (not found)";
   "org.github.chinlinlee.dcm2jpg"                    -> "org.dcm4che3.util (not found)";
}
```
- 在此你可以得知部分所需 jar 檔，請自行尋找相關 jar 檔
- 初步我們可以看到以下非原生的 jar 檔
    - org.apache.commons.cli (commons-cli-1.4.jar)
    - org.dcm4che3.data (dcm4che-core-5.30.0.jar)
    - org.dcm4che3.image (含有 image 名稱的所有 jar 檔)
    - org.dcm4che3.imageio.plugins.dcm (含有 image 名稱的所有 jar 檔)
    - org.dcm4che3.io (dcm4che-core-5.30.0.jar)
    - org.dcm4che3.tool (dcm4che-core-5.30.0.jar)
    - org.dcm4che3.util (dcm4che-core-5.30.0.jar)
- 其餘 jar 檔只能在執行錯誤 class not found 時知道，以下是此專案所需 jar 檔
    - dcm4che-tool-dcm2jpg-5.30.0.jar
    - slf4j-api-1.7.32.jar
:::tip
 你可以到 [dcm4che](https://github.com/dcm4che/dcm4che) 的 release 下載包裹好的 binary 檔案，並在 lib 資料夾尋找這些 jar 檔
:::

### 執行 java-ts-gen
- 原先是使用 cli 來產生，不過新版支援使用程式碼來進行產生，以後可以試試看

<Tabs activeName="bash">
  <TabPanel name="bash">

```bash
java-ts-gen ./output org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor --cp commons-cli-1.4.jar --cp dcm4che-core-5.30.0.jar --cp dcm4che-image-5.30.0.jar --cp dcm4che-imageio-5.30.0.jar --cp dcm4che-imageio-opencv-5.30.0.jar --cp dcm4che-imageio-rle-5.30.0.jar --cp weasis-core-img-4.6.0.jar --cp dcm2jpg.jar
```
  </TabPanel>
  
  <TabPanel name="javascript">
        
```javascript
const path = require("path");
const glob = require("glob");
const { appendClasspath, ensureJvm } = require("java-bridge");
const { TypescriptBulkDefinitionGenerator } = require("java-ts-definition-generator");

let depJarFiles = glob.sync("**/*.jar", {
    cwd: path.join(__dirname)
});

ensureJvm();
for (let i = 0; i < depJarFiles.length; i++) {
    appendClasspath(depJarFiles);
}

const generator = new TypescriptBulkDefinitionGenerator();

( async ()=> {
    // Generate definitions for the provided modules
    await generator.generate([
        "org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor"
    ]);

    // Save the definitions to a directory
    await generator.save(path.join(__dirname, "./src/java-wrapper"));
})();
```

  </TabPanel>
</Tabs>

- 產生結果
<div class="duration-300 hover:-translate-y-1 bg-transparent">
    <figure>
        <img src="{base}/node-java-bridge/generate-result.png" alt="Test Original" class="rounded-t h-16 w-auto object-cover">
    </figure>
</div>

- `Dcm2JpgExecutor` 的定義檔可至 `output/org/github/chinlinlee/dcm2jpg` 查看

### 編譯成 javascript
由於 raccoon 主要是以 javascript 撰寫，而非 typescript，所以要把 ts 轉成 js

- 初始化 tsc (初始化後，請記得自行更改 `tsconfig.json` 內的 `outDir`,`declaration`, `declarationMap`)
```bash
tsc --init
```
- 編譯
```bash
tsc --build
```
- 編譯後得到的 js 檔案
<div class="duration-300 hover:-translate-y-1 bg-transparent">
    <figure>
        <img src="{base}/node-java-bridge/ts-to-js.png" alt="Test Original" class="rounded-t h-16 w-auto object-contain">
    </figure>
</div>

- 之後你就可以把這些 js 檔案放到專案中使用囉！

### 使用案例
以下是使用 Node.js 呼叫 Java 的 Dcm2JpgExecutor function 的使用案例
```js
const { ensureJvm, appendClasspath } = require("java-bridge");
const glob = require("glob");
let jarFiles = glob.sync("**/*.jar", {
    cwd: __dirname
});

appendClasspath(jarFiles);

const { Dcm2JpgExecutor } = require("./dist/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor");
const { Dcm2JpgExecutor$Dcm2JpgOptions: Dcm2JpegOptions } = require("./dist/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");


ensureJvm();

(async () => {
    let opts = await Dcm2JpegOptions.newInstanceAsync();
    opts.frameNumber = 2;

    await Dcm2JpgExecutor.convertDcmToJpgFromFilename("./2.16.840.1.113995.3.110.3.0.10118.2000002.862753.3.dcm", "2.jpg", opts);
})();
```