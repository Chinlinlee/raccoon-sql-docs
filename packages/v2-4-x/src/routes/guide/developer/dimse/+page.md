# DIMSE 服務
- DICOM 的 DIMSE 服務非常廣泛，Raccoon 主要實作的是 DIMSE-C 的功能，以下是 Raccoon 目前支援的 DIMSE-C 功能
    - C-ECHO: 驗證兩端的端到端通訊是否成功，通常用於確定 Server 是否可呼叫
    - C-STORE: 儲存功能，用於將 DICOM 檔上傳到 PACS Server
    - C-FIND: 查詢功能
    - C-MOVE: 調閱功能，用於將 DICOM 下載到 Client，比較需要注意的是，C-MOVE 的下載方式為，開啟多個 C-STORE 的子程序讓 Server 透過 C-STORE 把影像上傳過來
- Raccoon 的 DIMSE 原先由另一個專案 [Chinlinlee / dcm4che-tool-dcmqrscp-raccoon-dicom](https://github.com/Chinlinlee/dcm4che-tool-dcmqrscp-raccoon-dicom) 利用 java 主導開發，**但目前已經將 DIMSE 主要功能移植到 Raccoon 內部**
- DIMSE 的相關實作可以至 `dimse` 資料夾中查看

## 參考資料
- [Dicom 学习笔记-Dicom 消息服务（DIMSE-C/DIMSE-N](https://www.jianshu.com/p/2812b0b6e548)
- [DICOM通讯（ACSE-＞DIMSE-＞Worklist）](https://zhuanlan.zhihu.com/p/386657486)