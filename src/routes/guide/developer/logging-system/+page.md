<script>
    import { base } from "$app/paths";
    import CenterImage from "$components/CenterImage.svelte";
</script>

# Logging System
Raccoon 原先使用 [log4js](https://www.npmjs.com/package/log4js) 進行 log，不過 log4js 雖然能輸出漂亮的 log，但是卻無法簡單地進行分析，所以在後續的版本已經更換為 [winston](https://www.npmjs.com/package/winston) 輸出結構化 (json) 的 log。

## 架構圖
<CenterImage src="{base}/logging-system/logging-system-arch-diagram.svg" alt="架構圖" title="Logging System 架構圖"></CenterImage>

## Fluent Bit
[Fluent Bit](https://fluentbit.io/) 是一款開源且高性能的日誌 (log)處理器與轉發器，專為日志收集與統一處理設計。它支持多種數據輸入和輸出插件，可以輕鬆與其他日志系統集成，提供輕量級的日志收集解決方案。

### 基本概念
大部分日誌處理器都將系統大致分為輸入、緩衝區以及輸出三個部分，輸入負責採集日誌，採集後會放在緩衝區中，緩衝區中的日誌會在輸出時再轉發到其他系統。
Fluent Bit 將這三大部分又在細分成: 輸入、解析、過濾、緩衝區、路由以及輸出六個部分:
- 輸入負責採集原始日誌
- 解析將原始日誌結構化，比如提取字句、解轉義等操作
- 過濾可以對日誌作一些統一的過濾和修改操作，比如增加一些統一的字句，過濾一些髒日誌等
- 日誌會被放到緩衝區等待發送
- 路由將會決定緩衝區的日誌要發送到哪些輸出
- 輸出將日誌真正轉發出去

### Raccoon 基本設定
Raccoon 目前所有的 log 檔案都存放於 pm2log 資料夾底下，並且副檔名都為 `.log`，所以我們可以直接對 Fluent Bit 設定監聽這些檔案
<details>
    <summary>設定檔</summary>

```text
[SERVICE]
    # Flush
    # =====
    # set an interval of seconds before to flush records to a destination
    flush        1

    # Daemon
    # ======
    # instruct Fluent Bit to run in foreground or background mode.
    daemon       Off

    # Log_Level
    # =========
    # Set the verbosity level of the service, values can be:
    #
    # - error
    # - warning
    # - info
    # - debug
    # - trace
    #
    # by default 'info' is set, that means it includes 'error' and 'warning'.
    log_level    info

    # Parsers File
    # ============
    # specify an optional 'Parsers' configuration file
    parsers_file parsers.conf

    # Plugins File
    # ============
    # specify an optional 'Plugins' configuration file to load external plugins.
    plugins_file plugins.conf

    # HTTP Server
    # ===========
    # Enable/Disable the built-in HTTP Server for metrics
    http_server  Off
    http_listen  0.0.0.0
    http_port    2020

    # Storage
    # =======
    # Fluent Bit can use memory and filesystem buffering based mechanisms
    #
    # - https://docs.fluentbit.io/manual/administration/buffering-and-storage
    #
    # storage metrics
    # ---------------
    # publish storage pipeline metrics in '/api/v1/storage'. The metrics are
    # exported only if the 'http_server' option is enabled.
    #
    storage.metrics on

    # storage.path
    # ------------
    # absolute file system path to store filesystem data buffers (chunks).
    #
    # storage.path /tmp/storage

    # storage.sync
    # ------------
    # configure the synchronization mode used to store the data into the
    # filesystem. It can take the values normal or full.
    #
    # storage.sync normal

    # storage.checksum
    # ----------------
    # enable the data integrity check when writing and reading data from the
    # filesystem. The storage layer uses the CRC32 algorithm.
    #
    # storage.checksum off

    # storage.backlog.mem_limit
    # -------------------------
    # if storage.path is set, Fluent Bit will look for data chunks that were
    # not delivered and are still in the storage layer, these are called
    # backlog data. This option configure a hint of maximum value of memory
    # to use when processing these records.
    #
    # storage.backlog.mem_limit 5M

[INPUT]
    Name         tail
    Path         raccoon/pm2log/*.log
    Parser       json
    Tag          raccoon

[OUTPUT]
    Name         es
    Match        *
    Host  127.0.0.1
    Port  9200
    HTTP_User elastic
    HTTP_Passwd elastic
    Trace_Error On
    Index           <fluent-bit-{now/d}>
    Replace_Dots    On
    tls               On
    tls.verify        Off
    tls.crt_file      /elasticsearch-8.12.2/config/certs/http_ca.crt
    Suppress_Type_Name On
```
:::important[重要事項]
- 請記得一定要設定 `HTTP_User` 以及 `HTTP_Passwd`
- 請記得一定要設定 `Suppress_Type_Name` 為 `On`
    - 這個設定於 Elasticsearch 7.0 後的版本一定要設定
- 請記得要開啟 tls，除非你的 elasticsearch 沒有設定要透過 https 連線
:::
</details>

## Elasticsearch
為進行 log 日誌的分析，我們選擇了 [Elasticsearch](https://www.elastic.co/cn/elasticsearch) 作為我們的分析日誌系統，以及其生態系統內的 [kibana](https://www.elastic.co/cn/kibana) 作為視覺化以及 debug 的工具。



## Audit message
以下將會列出各個 Service 的 Audit message

### QIDO-RS/C-FIND
- 進行 Query 時，會產生 [Query](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_A.5.3.10.html) 的 Audit Message
- 查詢完畢後，會產生 [DICOM Instances Accessed](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_A.5.3.6.html) 的 Audit Message
    - 注意，只會有 Patient ID 和 Study Instance UID 

### STOW-RS/C-STORE
- 進行上傳時，會先行產生 [Begin Transferring DICOM Instances](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_A.5.3.3.html) 的 Audit Message
- 上傳完畢時 (含上傳失敗)，會產生 [DICOM Instances Transferred](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_A.5.3.7.html) 的 Audit Message

### WADO-RS/WADO-URI/C-MOVE
- 進行 Retrieve 時，會先行產生 [Begin Transferring DICOM Instances](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_A.5.3.3.html) 的 Audit Message
- Retrieve 完畢後，會產生 [DICOM Instances Transferred](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_A.5.3.7.html) 的 Audit Message

TODO: 列出 Audit message 在各個 Service 中的用法

# 參考資料
- [Fluent Bit介紹](https://huweicai.com/fluent-bit/)