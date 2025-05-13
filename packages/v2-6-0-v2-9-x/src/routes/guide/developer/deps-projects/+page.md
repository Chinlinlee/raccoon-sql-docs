# 相依專案
以下是 Raccoon 所使用/參考的主要相依專案，沒有這些專案，就不會有 Raccoon

- [dcm4che](https://github.com/dcm4che/dcm4che)
- [dicom-parser](https://www.npmjs.com/package/dicom-parser)
- [java-bridge](https://www.npmjs.com/package/java-bridge)

## 自建專案
- [raccoon-dcm4che-bridge](https://github.com/Chinlinlee/raccoon-dcm4che-bridge)
    - 包裹 java-bridge 產生的程式碼以及常用函式的專案
    - dcm2dcm
    - dcm2json
    - dicomdir
    - DicomUtf8Converter
    - 這樣之後有需要 node-java-bridge 依賴的專案都不需重新產生程式碼
- [dcm777](https://github.com/Chinlinlee/dcm777)
    - 專門用於將 java 較複雜無法透過 node-java-bridge 直接呼叫的函式包裝的專案
- [java-dcm2jpg](https://github.com/Chinlinlee/java-dcm2jpg/tree/main)
    - 因 node-java-bridge 直接使用 dcm4che 的 dcm2jpg 工具會造成效能問題，所以用 java 把 class 包進 function 裡，並透過 node-java-bridge 呼叫
    - 也許之後應合併至 `dcm777`
- [raccoon-simple-hl7-server](https://www.npmjs.com/package/raccoon-simple-hl7-server)
    - 簡易的 HL7 server 專案
- [dicomjson-to-fhir](https://www.npmjs.com/package/dicomjson-to-fhir)
    - 將 dicom json 轉換成 FHIR Resources 的專案