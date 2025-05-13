<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";
</script>

# node-java-bridge

Raccoon 目前有一些功能是與 java 混和撰寫而成。
使用套件為 [node-java-bridge](https://github.com/MarkusJx/node-java-bridge)

目前產生的定義檔以及 java jar 都已經移到專案[raccoon-dcm4che-bridge](https://github.com/Chinlinlee/raccoon-dcm4che-bridge)

現在 raccoon 自己實作的 java code 都會放置在[dcm777](https://github.com/Chinlinlee/dcm777)專案內

如果要創建 java 的程式碼，請務必到此專案實作

## 主要檔案
- `src/index.js`: 初始化 java bridge 的檔案 (包含引入 jar 檔)
- `src/javaNode`: 放置所有 jar 檔的資料夾
- `src/wrapper`: 放置 `java-ts-definition-generator` 產生的定義檔的資料夾
- `src/DicomUtf8Converter.js`: 用於修正遺失或錯誤編碼的 DICOM class，會將 DICOM 編碼設定成 utf-8
- `src/dcm2dcm.js`: 用來轉換 transfer syntax 的 class
- `src/dicomdir.js`: 處理產生 dicomdir 的 class
- `src/dcm2json.js`: 處理 DICOM 轉 JSON 的 class
- `java-code-generator`: 用來產生 java code 的 typescript definitions 工具


## 開發案例 - mpps

正常來說，我們可以直接引入 dcm4che 提供的 class 在 nodejs 實作我們想要的功能

但有些功能實作牽扯到繼承或 thread safe 或進階的 java 語法 (e.g. lambda)

這裡將會以實作 MPPS SCP 為例，來告訴大家 Raccoon 遇到需要使用較複雜的 java 程式時的開發流程

### 建立 java MPPS SCP

:::info
主要參考資料:
- https://github.com/dcm4che/dcm4chee-arc-light/blob/774b1a4698bdbb5c52a592e1a7f61f7c9e6858a1/dcm4chee-arc-mpps-scp/src/main/java/org/dcm4chee/arc/mpps/scp/MPPSSCP.java#L54
- https://github.com/dcm4che/dcm4che/blob/0b6bc044b11434ccbb0152dd27a76a37e3f5857c/dcm4che-tool/dcm4che-tool-mppsscp/src/main/java/org/dcm4che3/tool/mppsscp/MppsSCP.java#L67
- https://github.com/dcm4che/dcm4che/blob/master/dcm4che-net/src/main/java/org/dcm4che3/net/service/BasicMPPSSCP.java#L55
:::

- 首先，在 `net` 資料夾創建 `SimpleMPPSScp.java` 檔案，內容如下

```java
package org.github.chinlinlee.dcm777.net;

import org.dcm4che3.data.Attributes;
import org.dcm4che3.net.Association;
import org.dcm4che3.net.Dimse;
import org.dcm4che3.net.pdu.PresentationContext;
import org.dcm4che3.net.service.BasicMPPSSCP;
import org.dcm4che3.net.service.DicomServiceException;

import java.io.IOException;

public class SimpleMPPSScp extends BasicMPPSSCP {
    // 為什麼會有 inject? 因為我們在 nodejs 沒辦法直接修改 java 的 code，也沒辦法從 nodejs 進行繼承
    // 不過我們可以透過注入一個 interface 並呼叫使用
    // 而 node-java-bridge 也有提供實作 interface 的接口
    MPPSScpInject myMPPSScpInject;

    public SimpleMPPSScp(MPPSScpInject inject) {
        myMPPSScpInject = inject;
    }

    // 當我們接收到 DIMSE 請求時，會進到這個 function
    // 之後會判斷進來的請求的類別，再進到相對應的操作內
    public void onDimseRQ(Association as, PresentationContext pc, Dimse dimse, Attributes rq, Attributes rqAttrs) throws IOException {
        switch (dimse) {
            case N_CREATE_RQ:
                this.onNCreateRQ(as, pc, rq, rqAttrs);
                break;
            case N_SET_RQ:
                this.onNSetRQ(as, pc, rq, rqAttrs);
                break;
            default:
                throw new DicomServiceException(529);
        }

    }

    public void onNCreateRQ(Association as, PresentationContext pc, Attributes rq, Attributes rqAttrs) {
        myMPPSScpInject.onNCreateRQ(as, pc, rq, rqAttrs);
    }

    public void onNSetRQ(Association as, PresentationContext pc, Attributes rq, Attributes rqAttrs) {
        myMPPSScpInject.onNSetRQ(as, pc, rq, rqAttrs);
    }
}

```

- 創建 `MPPSScpInject.java`，內容如下

```java
package org.github.chinlinlee.dcm777.net;

import org.dcm4che3.data.Attributes;
import org.dcm4che3.net.Association;
import org.dcm4che3.net.pdu.PresentationContext;

public interface MPPSScpInject {
    // 定義了處理 N-CREATE-RQ 的方法
    // 我們可以將實際邏輯放到 nodejs 中實作
    public void onNCreateRQ(Association as, PresentationContext pc, Attributes rq, Attributes rqAttrs);
    // 定義了處理 N-SET-RQ 的方法
    public void onNSetRQ(Association as, PresentationContext pc, Attributes rq, Attributes rqAttrs);
}

```

- java 寫完後，編譯成 jar 檔，應該會輸出 `dcm777-5.32.0.jar` 檔案
- 輸出後，放到 `raccoon-dcm4che-bridge` 專案的 `src/javaNode/dcm4che/lib/qrscp` 資料夾內
- 修改 `java-code-generator` 內的 `index.js` 檔案
- 在 `needGenerateClasses` 的陣列把實作的 class path 加入進去

```javascript
const needGenerateClasses = [
    // ...省略
    "org.github.chinlinlee.dcm777.net.SimpleMPPSScp",
    "org.github.chinlinlee.dcm777.net.MPPSScpInject",
    // ...省略
];

```

- 加入後你可以透過兩種方式產生定義檔
  - 第一種：產生所有 classes 的定義檔
  
  ```bash
  node java-code-generator/index
  ```
  
  - 第二種：產生指定 class 的定義檔 (Recommend，除非產生不完整)
  
  ```bash
  node java-code-generator/cli.js --cn org.github.chinlinlee.dcm777.net.SimpleMPPSScp --cn org.github.chinlinlee.dcm777.net.MPPSScpInject
  ```
  
- 有必要的話，可以自己寫個 example 測試，例如：[mppsscp.js](https://github.com/Chinlinlee/raccoon-dcm4che-bridge/blob/main/example/mppsscp.js)
- 更新後，我們需要 publish npm package (後續你必須自己 fork，自己 publish，自己把 raccoon 的 package 覆蓋掉)

```bash
npm version patch | minor
```
```
npm publish
```

- 在 publish 之後，需要到 raccoon 下載最新版的 raccoon-dcm4che-bridge 套件，並在裡面實作
- 實作後的結果在[mppsscp.js](https://gitlab.dicom.tw/a5566qq123/raccoon-dicom/-/blob/enterprise-release/dimse/mppsscp.js?ref_type=heads)當中

以上大致是 raccoon 實作 java 程式碼的大致流程


## Dcm2JpgExecutor 案例

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