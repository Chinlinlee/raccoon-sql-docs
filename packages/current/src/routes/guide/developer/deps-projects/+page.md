# 相依專案
以下是 Raccoon 所使用/參考的主要相依專案，沒有這些專案，就不會有 Raccoon

- [dcm4che](https://github.com/dcm4che/dcm4che)
- [Chinlinlee / java-dcm2jpg](https://github.com/Chinlinlee/java-dcm2jpg/tree/main)
    - 因 node-java-bridge 直接使用 dcm4che 的 dcm2jpg 工具會造成效能問題，所以用 java 把 class 包進 function 裡，並透過 node-java-bridge 呼叫
- [Chinlinlee / dcm4che-tool-dcmqrscp-raccoon-dicom](https://github.com/Chinlinlee/dcm4che-tool-dcmqrscp-raccoon-dicom)
    - 此專案是使用 dcm4che 的 dcmqrscp 工具撰寫而成
    - 後續希望能夠改成用 node-java-bridge 來重構
- [Chinlinlee / dicom-to-json](https://github.com/Chinlinlee/dicom-to-json)
    - 此專案是使用 napi 混和 C++ DCMTK 的 dcm2json 撰寫而成
    - 後續也許能改成使用 java 或 node-java-bridge 撰寫
- [dicom-parser](https://www.npmjs.com/package/dicom-parser)
- [java-bridge](https://www.npmjs.com/package/java-bridge)