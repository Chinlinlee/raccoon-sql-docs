<script>
    import { base } from "$app/paths";
    import CenterImage from "$components/CenterImage.svelte";
</script>

# Logging System
Raccoon 原先使用 [log4js](https://www.npmjs.com/package/log4js) 進行 log，不過 log4js 雖然能輸出漂亮的 log，但是卻無法簡單地進行分析，所以在後續的版本已經更換為 [winston](https://www.npmjs.com/package/winston) 輸出結構化 (json) 的 log。

## 架構圖
<CenterImage src="{base}/logging-system/logging-system-arch-diagram.svg" alt="架構圖" title="Logging System 架構圖"></CenterImage>

## Fluentd
[Fluentd](https://www.fluentd.org/) 是一款開源且高性能的日誌 (log)處理器與轉發器，專為日志收集與統一處理設計。它支持多種數據輸入和輸出插件，可以輕鬆與其他日志系統集成，提供輕量級的日志收集解決方案。

### 基本概念
大部分日誌處理器都將系統大致分為輸入、緩衝區以及輸出三個部分，輸入負責採集日誌，採集後會放在緩衝區中，緩衝區中的日誌會在輸出時再轉發到其他系統。
Fluent Bit 將這三大部分又在細分成: 輸入、解析、過濾、緩衝區、路由以及輸出六個部分:
- 輸入負責採集原始日誌
- 解析將原始日誌結構化，比如提取字句、解轉義等操作
- 過濾可以對日誌作一些統一的過濾和修改操作，比如增加一些統一的字句，過濾一些髒日誌等
- 日誌會被放到緩衝區等待發送
- 路由將會決定緩衝區的日誌要發送到哪些輸出
- 輸出將日誌真正轉發出去

### 安裝 Fluentd
1. 首先，更新你的套件索引：

```bash
sudo apt update
```

2. 然後，安裝 Fluentd：

```bash
# fluent-package 5 (LTS)
curl -fsSL https://toolbelt.treasuredata.com/sh/install-debian-bookworm-fluent-package5-lts.sh | sh
```

3. 啟動 Fluentd：

```bash
sudo systemctl start fluentd.service
```

4. 安裝依賴套件

```bash
sudo apt install -y --no-install-recommends make gcc g++ libc-dev
```

5. 安裝 mongo plugin

```bash
sudo ./fluent-gem install fluent-plugin-mongo
```

6. 新增設定檔

```bash
sudo fluentd --setup /etc/fluent
```

### Raccoon 基本設定
Raccoon 目前所有的 log 檔案都存放於 pm2log 資料夾底下，並且副檔名都為 `.log`，所以我們可以直接對 Fluentd 設定監聽這些檔案
<details>
    <summary>Mongodb 作為 output 的設定檔</summary>

```ini
<source>
  @type tail
  path /var/log/raccoon/*.log
  exclude_path ["/var/log/raccoon/raccoon.log", "/var/log/raccoon/raccoon-formatted-audit.log"]
  pos_file /var/log/raccoon/fluentd.pos
  tag mongo.raccoon
  read_from_head  true

  <parse>
    @type json
  </parse>
</source>

# for formatted audit log
<source>
  @type tail
  path /var/log/raccoon/raccoon-formatted-audit.log
  pos_file /var/log/raccoon/fluentd-audit.pos
  tag mongo.raccoon-audit
  read_from_head true

  <parse>
    @type json
  </parse>
</source>

<source>
  @type tail
  path /var/log/raccoon/raccoon.log
  pos_file /var/log/raccoon/fluentd-dcm4che.pos
  tag mongo.raccoon-dcm4che
  read_from_head  true
  follow_inodes true
  
  <parse>
    @type multiline
    format_firstline /^\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}/
    format1 /^(?<time>\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}) \[(?<thread>.*)\] (?<level>[^\s]+) (?<message>[\s\S]*)$/
  </parse>
</source>

<match mongo.**>
  @type mongo
  collection ${tag[1]}-log
  
  connection_string mongodb://root:root@fluentd-mongo:27017/raccoon-logs?authSource=admin
  
  <buffer tag,time>
    timekey        1
    timekey_wait   0
  </buffer>
  # make sure to include the time key
  <inject>
    time_key time
  </inject>
</match>

```
:::important[重要事項]
- 請記得一定要設定 `connection_string`
:::
</details>

<details>
    <summary>Elasticsearch 作為 output 的設定檔</summary>

```ini
<source>
  @type tail
  path /var/log/raccoon/*.log
  exclude_path ["/var/log/raccoon/raccoon.log", "/var/log/raccoon/raccoon-formatted-audit.log"]
  pos_file /var/log/raccoon/fluentd.pos
  tag es.raccoon
  read_from_head  true

  <parse>
    @type json
  </parse>
</source>

# for formatted audit log
<source>
  @type tail
  path /var/log/raccoon/raccoon-formatted-audit.log
  pos_file /var/log/raccoon/fluentd-audit.pos
  tag es.raccoon-audit
  read_from_head true

  <parse>
    @type json
  </parse>
</source>

<source>
  @type tail
  path /var/log/raccoon/raccoon.log
  pos_file /var/log/raccoon/fluentd-dcm4che.pos
  tag es.raccoon-dcm4che
  read_from_head  true
  follow_inodes true
  
  <parse>
    @type multiline
    format_firstline /^\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}/
    format1 /^(?<time>\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}) \[(?<thread>.*)\] (?<level>[^\s]+) (?<message>[\s\S]*)$/
  </parse>
</source>


<match es.**>
  @type elasticsearch
  index_name ${tag[1]}-log
  
  scheme https
  host 127.0.0.1
  port 9200
  # use `%{}` placeholders to escape for URL encoding characters
  user %{elastic}
  # don't use password that contain '+'
  password %{elastic}
  ssl_verify false

  <buffer tag,time>
    timekey        1
    timekey_wait   0
  </buffer>
  # make sure to include the time key
  <inject>
    time_key time
  </inject>
</match>
```
</details>

## Log 分析
### MongoDB
MongoDB 目前將會以 API 的方式進行分析，此 API 以 Plugin 的方式存在，你可以在實驗室的 Gitlab 上找到它，路徑為: `plugins/statistic-mongodb`。

設定內容如下
```js
module.exports.pluginsConfig = {
    // 省略...
    "statistic-mongodb": {
        enable: true, // true 為啟動
        before: true, // 不動
        routers: [],
        mongodb: {
            hosts: ["127.0.0.1"], // mongodb 的連接位址，必填
            ports: [27017], // mongodb 的連接位址對應的 port，必填
            dbName: "raccoon-logs", // mongodb 連接的資料庫名稱
            urlOptions: "", // mongodb 連接的參數
            user: "root", // mongodb 連接的使用者帳號，必填
            password: "root", // mongodb 連接的使用者密碼，必填
            authSource: "admin" // mongodb 驗證帳號密碼的資料庫來源
        }
    }
}
```

### Elasticsearch
為進行 log 日誌的分析，我們可以使用 [Elasticsearch](https://www.elastic.co/cn/elasticsearch) 作為我們的分析日誌系統，以及其生態系統內的 [kibana](https://www.elastic.co/cn/kibana) 作為視覺化以及 debug 的工具。


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