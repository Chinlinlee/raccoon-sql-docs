<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";

    let host = "{host}";
</script>

# Installation

以下安裝步驟所使用的環境為 `debian 12`

:::tip[小技巧]
如果你使用 docker compose 進行安裝，可以直接跳到 <Link to="#使用-docker-compose" label="使用 docker-compose 章節" withBase={false} />
:::

## 環境所需
- [Node.js](https://nodejs.org/en/download/current) >= 18
- [Java JDK](https://adoptium.net/temurin/releases/) >= 11
  - 請記得複製 `libclib_jiio.so` 以及 `libopencv_java.so`，你可以在 `models\dcm4che\lib\linux-x86-64` 找到這兩個檔案
- [imagemagick](https://imagemagick.org/script/download.php)
- [PostgreSQL](https://www.postgresql.org/download/) >= 14
- [MongoDB](https://www.mongodb.com/docs/v3.0/tutorial/install-mongodb-on-debian/) >= 4
- [fluentd](https://www.fluentd.org/download)


## 安裝 node.js

這裡建議使用 nvm 作為你的 Node.js 管理器

使用以下命令安裝 nvm：

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

重新運行 bash，以載入 nvm 進行使用

```bash
bash
```

然後運行以下指令來安裝 Node.js

```bash
nvm install 20
```

## 安裝 Java JDK

以下是在 Linux 系統中安裝 Java JDK 的步驟：

1. 首先，更新你的套件索引：

```bash
sudo apt update
```

1. 然後，安裝 Java Development Kit：

```bash
sudo apt install default-jdk -y
```

接下來，我們將安裝 imagemagick 和 Postgresql。

## 安裝 imagemagick

1. 運行以下指令安裝 imagemagick

```bash
sudo apt install imagemagick -y
```

## 安裝 Postgresql

1. 建立檔案儲存庫設定：

```bash
sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

1. 導入存儲庫簽名密鑰：

```bash
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```

1. 更新你的套件索引：

```bash
sudo apt update
```

2. 然後，安裝 Postgresql：

```bash
sudo apt-get -y install postgresql
```

3. 安裝後，請記得創建給 Raccoon 使用的資料庫

```bash
sudo -u postgres psql -c "CREATE DATABASE raccoon;"
```


## 安裝 git

1. 輸入以下指令安裝 git

```bash
sudo apt install git
```

## 下載 Raccoon

我們使用 git 作為我們的下載方式，運行以下指令將 Raccoon 下載下來

```bash
git clone https://gitlab.dicom.tw/a5566qq123/raccoon-dicom.git --branch dev-sql-b
```

## 安裝依賴套件

⚠️ 請先進到 Raccoon-DICOM 專案目錄

運行以下指令安裝 Node.js 的依賴套件

```bash
npm i
```

## dcm4che libraries (opencv)
:::important[注意事項]
**此步驟很重要，請一定要做**
:::

dcm4che 使用 opencv 作為影像處理的接口，所以你必須將 opencv 的依賴放入 Java JDK 的 lib 資料夾當中

請複製 `libclib_jiio.so` 以及 `libopencv_java.so` 至 Java JDK 的 lib 資料夾當中，正常路徑為 `/usr/lib/jvm/default-java/lib`

若你找不到你的 Java JDK lib 的路徑，可以嘗試運行 `readlink -f $(which javac)` 指令來知道 bin 的位置，通常 lib 資料夾會與 bin 在相同目錄下

## 設定

### dotenv `.env`

- 在專案根目錄找到 .env 檔案進行設定，務必在實際環境使用較安全的設定
- 可以直接複製 .env.template 並命名為 .env 進行修改
- env file
    
    ```ini
    DB_TYPE="sql"
    FLUENT_MONGODB_USER=root
    FLUENT_MONGODB_PASSWORD=root
    
    # MongoDB
    MONGODB_NAME="raccoon"
    MONGODB_HOSTS=["127.0.0.1"]
    MONGODB_PORTS=[27017]
    MONGODB_USER="root"
    MONGODB_PASSWORD="root"
    MONGODB_AUTH_SOURCE="admin"
    MONGODB_OPTIONS=""
    MONGODB_IS_SHARDING_MODE=false
    
    # SQL
    SQL_HOST="raccoon-postgres"
    SQL_PORT="5432"
    SQL_DB="raccoon"
    SQL_TYPE="postgres"
    SQL_USERNAME="postgres"
    SQL_PASSWORD="postgres"
    SQL_LOGGING=false
    SQL_FORCE_SYNC=false
    SQL_ALTER_SYNC=false
    
    # Server
    SERVER_PORT=8081
    SERVER_SESSION_SECRET_KEY="secret-key"
    DICOM_DELETE_SCHEDULE="0 */1 * * *"
    
    # DICOM Web
    DICOM_STORE_ROOTPATH="/dicomFiles"
    DICOMWEB_HOST="{host}"
    DICOMWEB_PORT=8081
    DICOMWEB_API="dicom-web"
    DICOMWEB_AE="RACCOON"
    
    # DICOM DIMSE
    ENABLE_DIMSE=true
    DIMSE_CHECK_STORE_SCU_AE=false
    DIMSE_CHECK_FIND_SCU_AE=false
    DIMSE_CHECK_MOVE_SCU_AE=false
    RESTART_SCHEDULE="0 3 * * *" # At 03:00
    DIMSE_AE_TITLE="RACCOONQRSCP" # default: RACCOONQRSCP
    DIMSE_HOSTNAME="0.0.0.0" # default: 127.0.0.1
    DIMSE_PORT=11112 # default: 11112
    DIMSE_FIND_MAX_COUNT=100
    DIMSE_MAX_PDULEN_RCV=16378
    DIMSE_MAX_PDULEN_SND=16378
    DIMSE_NOT_ASYNC=false
    DIMSE_MAX_OPS_INVOKED=0
    DIMSE_MAX_OPS_PERFORMED=0
    DIMSE_NOT_PACK_PDV=false
    DIMSE_CONNECT_TIMEOUT=0
    DIMSE_REQUEST_TIMEOUT=0
    DIMSE_ACCEPT_TIMEOUT=0
    DIMSE_RELEASE_TIMEOUT=0
    DIMSE_SEND_TIMEOUT=0
    DIMSE_STORE_TIMEOUT=0
    DIMSE_RESPONSE_TIMEOUT=0
    DIMSE_RETRIEVE_TIMEOUT=0
    DIMSE_RETRIEVE_TIMEOUT_TOTAL=0
    DIMSE_IDLE_TIMEOUT=0
    DIMSE_SOCLOSE_DELAY=50
    DIMSE_SOSND_BUFFER=0
    DIMSE_SORCV_BUFFER=0
    DIMSE_TCP_DELAY=false
    
    # DIMSE TLS
    DIMSE_ENABLE_TLS=false
    
    # DIMSE Cipher
    DIMSE_TLS_CIPHER=["SSL_RSA_WITH_NULL_SHA","TLS_RSA_WITH_AES_128_CBC_SHA","SSL_RSA_WITH_3DES_EDE_CBC_SHA"]
    
    # DIMSE Protocol
    DIMSE_TLS_PROTOCOL=["TLSv1.3","TLSv1.2","TLSv1.1","TLSv1"]
    DIMSE_TLS_EIA_HTTPS=false
    DIMSE_TLS_EIA_LDAPS=false
    DIMSE_TLS_NOAUTH=false
    DIMSE_KEY_STORE="./config/certs/key.p12"
    DIMSE_KEY_STORE_TYPE="PKCS12"
    DIMSE_KEY_STORE_PASS="secret"
    DIMSE_KEY_PASS="secret"
    DIMSE_TRUST_STORE="./config/certs/cacerts.p12"
    DIMSE_TRUST_STORE_TYPE="PKCS12"
    DIMSE_TRUST_STORE_PASS="secret"
    ```
    

#### 環境變數資訊


| Field Name | Type of Value | Description |
| --- | --- | --- |
| DB_TYPE | string | Raccoon 所使用的資料庫類別，目前支援: sql, mongodb |
| FLUENT_MONGODB_USER | string | 用於與 Fluentd 的 MongoDB 伺服器認證的使用者名稱，主要用於 docker |
| FLUENT_MONGODB_PASSWORD | string | 用於與 Fluentd 的 MongoDB 伺服器認證的密碼，主要用於 docker |
| #SQL |  |  |
| SQL_HOST | string | SQL 伺服器的主機名稱或 IP 地址 |
| SQL_PORT | array of strings | SQL 伺服器運行的端口號。正常情況下，PostgreSQL 使用 5432 |
| SQL_DB | array of numbers | 要連接的資料庫名稱 |
| SQL_TYPE | string | SQL 資料庫的類型。例如，postgres，可使用: mysql, mariadb, sqlite, postgresql, mssql |
| SQL_USERNAME | string | 用於與 SQL 伺服器認證的使用者名稱 |
| SQL_PASSWORD | string | 用於與 SQL 伺服器認證的密碼 |
| SQL_LOGGING | boolean | 啟用或禁用 sequelize 的日誌記錄。false 為禁用，true 為啟用 |
| SQL_FORCE_SYNC | boolean | 啟動時強制同步資料庫架構 ( 會將資料全部刪除並重建 tables )。false 為禁用，true 為啟用 |
| #MongoDB |  |  |
| MONGODB_NAME | string | MongoDB 伺服器的資料庫名稱 |
| MONGODB_HOSTS | string[] | MongoDB 伺服器的主機名稱或 IP 地址 |
| MONGODB_PORTS | number[] | MongoDB 伺服器運行的埠(port)號 |
| MONGODB_USER | string | 用於與 MongoDB 伺服器認證的使用者名稱 |
| MONGODB_PASSWORD | string | 用於與 MongoDB 伺服器認證的密碼 |
| MONGODB_OPTIONS | string | MongoDB 連接時的選項 |
| MONGODB_IS_SHARDING_MODE | boolean | 是否為分片模式 |
| #Server |  |  |
| SERVER_PORT | number | 伺服器運行的埠(port)號 |
| SERVER_SESSION_SECRET_KEY | string | 用於 session 的保密金鑰 |
| DICOM_DELETE_SCHEDULE | string | 定時刪除 DICOM 檔案的時間，格式使用 crontab |
| DICOM_CACHE_TTL | number | DICOM 緩存過期時間 (秒)，目前主要用於 ASUS Web Storage，預設為 7200 |
| DICOM_CACHE_DISK_THRESHOLD | number | 這是 FIFO DICOM 緩存磁碟使用量門檻，數值為 0~100，單位使用百分比%，若要使用啟用此模式`DICOM_CACHE_TTL`設為0，請將，目前主要用於 ASUS Web Storage，預設為 10 |
| DICOM_THUMBNAIL_CACHE_TTL | number | DICOM 縮圖緩存過期時間 (秒)，預設為 86400 |
| #DICOMweb |  |  |
| DICOM_STORE_ROOTPATH | string | 存放 DICOM 檔案的根目錄 |
| DICOMWEB_HOST | string | DICOM Web 伺服器的主機名稱。用於組合 00081190 (Retrieve URL)。您可以在字串中使用 \{host\}，它將替換為 request.headers.host |
| DICOMWEB_PORT | number | DICOM Web 伺服器運行的埠(port)號。用於組合 00081190 (Retrieve URL)e.g. 8088，將會產生 http://example.com:8088/dicom-web/studies |
| DICOMWEB_API  | string | DICOM Web API 路徑。用於組合 00081190 (Retrieve URL)，e.g. /dicom-web，將會產生 http://example.com:8088/dicom-web/studies |
| DICOMWEB_AE | string | 設定要回傳的 Retrieve AE Title (0008,0054)，若 DIMSE 服務為開啟狀態，將優先使用 DIMSE 的 AE Title |
| #DIMSE |  |  |
| ENABLE_DIMSE | boolean | 是否啟用 DICOM DIMSE 服務 |
| DIMSE_CHECK_STORE_SCU_AE | boolean | 是否啟用檢查 DIMSE C-STORE SCU AE 功能 |
| DIMSE_CHECK_FIND_SCU_AE | boolean | 是否啟用檢查 DIMSE C-FIND SCU AE 功能 |
| DIMSE_CHECK_MOVE_SCU_AE | boolean | 是否啟用檢查 DIMSE C-MOVE SCU AE 功能 |
| RESTART_SCHEDULE | string | 定時重啟 DICOM DIMSE 服務的時間，格式使用 crontab |
| DIMSE_AE_TITLE | string | DICOM DIMSE 的 Application Entity title (AETitle). |
| DIMSE_HOSTNAME | string | DICOM DIMSE 的 Hostname |
| DIMSE_PORT | number | DICOM DIMSE 的 port 號 |
| DIMSE_FIND_MAX_COUNT | number | DIMSE C-FIND 的最大回傳筆數 (Default 為 100) |
| DIMSE_MAX_PDULEN_RCV | number | specifies maximal length of received P-DATA TF PDUs communicated during association establishment. 0 indicates that no maximum length is specified. 16378 by default |
| DIMSE_MAX_PDULEN_SND | number | specifies maximal length of sent P-DATA-TF PDUs by this AE. The actual maximum length of sent P-DATA-TF PDUs is also limited by the maximal length of received P-DATA-TF PDUs of the peer AE communicated during association establishment. 16378 by default |
| DIMSE_NOT_ASYNC | boolean | do not use asynchronous mode; equivalent to --max-ops-invoked=1 and --max-ops-performed=1 |
| DIMSE_MAX_OPS_INVOKED | number | maximum number of operations this AE may invoke asynchronously, unlimited by default |
| DIMSE_MAX_OPS_PERFORMED | number | maximum number of operations this AE may perform asynchronously, unlimited by default |
| DIMSE_NOT_PACK_PDV | boolean | send only one PDV in one P-Data-TF PDU; pack command and data PDV in one P-DATA-TF PDU by default |
| DIMSE_CONNECT_TIMEOUT | number | timeout in ms for TCP connect, no timeout by default |
| DIMSE_REQUEST_TIMEOUT | number | timeout in ms for receiving A-ASSOCIATE-RQ, no timeout by default |
| DIMSE_ACCEPT_TIMEOUT | number | timeout in ms for receiving A-ASSOCIATE-AC, no timeout by default |
| DIMSE_RELEASE_TIMEOUT | number | timeout in ms for receiving A-RELEASE-RP, no timeout by default |
| DIMSE_SEND_TIMEOUT | number | timeout in ms for sending other DIMSE RQs than C-STORE RQs, no timeout by default |
| DIMSE_STORE_TIMEOUT | number | timeout in ms for sending C-STOREsRQ, no timeout by default |
| DIMSE_RESPONSE_TIMEOUT | number | timeout in ms for receiving other outstanding DIMSE RSPs than C-MOVE or C-GET RSPs, no timeout by default |
| DIMSE_RETRIEVE_TIMEOUT | number | Timeout for retrieving DIMSE objects. |
| DIMSE_RETRIEVE_TIMEOUT_TOTAL | number | Total timeout for retrieving DIMSE objects. |
| DIMSE_IDLE_TIMEOUT | number | timeout in ms for aborting idle Associations, no timeout by default |
| DIMSE_SOCLOSE_DELAY | number | delay in ms after sending A-ASSOCATE-RJ, A-RELEASE-RQ or A-ABORT before the socket is closed; 50ms by default |
| DIMSE_SOSND_BUFFER | number | set SO_SNDBUF socket option to specified value |
| DIMSE_SORCV_BUFFER | number | set SO_RCVBUF socket option to specified value |
| DIMSE_TCP_DELAY | boolean | set TCP_NODELAY socket option to false, true by default |
| DIMSE_ENABLE_TLS | boolean | 是否啟用 TLS |
| DIMSE_TLS_CIPHER | string[] | TLS 所使用的 Cipher Suite，e.g. ["SSL_RSA_WITH_NULL_SHA","TLS_RSA_WITH_AES_128_CBC_SHA","SSL_RSA_WITH_3DES_EDE_CBC_SHA"] |
| DIMSE_TLS_PROTOCOL | string[] | TLS 所支援的 Protocol，e.g. ["TLSv1.3","TLSv1.2","TLSv1.1","TLSv1"] |
| DIMSE_TLS_EIA_HTTPS | boolean | enable server endpoint identification according RFC 2818: HTTP Over TLS |
| DIMSE_TLS_EIA_LDAPS | boolean | enable server endpoint identification according RFC 2830: LDAP Extension for TLS |
| DIMSE_TLS_NOAUTH | boolean | disable client authentication for TLS |
| DIMSE_KEY_STORE | string | file path or URL of key store containing the private key, config/certs/key.p12 by default |
| DIMSE_KEY_STORE_TYPE | string | type of key store containing the private key, PKCS12 by default |
| DIMSE_KEY_STORE_PASS | string | password for key store containing the private key, 'secret' by default |
| DIMSE_KEY_PASS | string | password for accessing the key in the key store, key store password by default |
| DIMSE_TRUST_STORE | string | file path of key store containing trusted certificates, config/certs/cacerts.p12 by default |
| DIMSE_TRUST_STORE_TYPE | string | type of key store with trusted certificates, PKCS12 by default |
| DIMSE_TRUST_STORE_PASS | string | password for key store with trusted certificates, 'secret' by default |

## Plugin 設定

- 你必須在 `plugins` 資料夾中創建以及設定 `config.js` 檔案
- 你可以參考 `config.template.js` 進行修改
- **如果你不需要使用 plugin，你可以直接複製 `config.template.js`並命名為 `config.js` 即可**

### OAuth
:::tip[tip]
OAuth Server 的架設可以參考 <Link to="#OAuth-Keycloak-%E6%9E%B6%E8%A8%AD" label="OAuth Keycloak 架設" withBase={false} /> 章節
:::
- plugin 名稱: `oauth`

| Key | Description |
| --- | --- |
| `routers[x].path` | The path pattern that matches all routes. |
| `routers[x].method` | The HTTP method to be used for the route. |
| `server.url` | The URL of the server. |
| `server.realm` | The realm for authentication. |
| `server.clientId` | The client ID for authentication. |
| `server.clientSecret` | The client secret for authentication. |
| `acl.enable`| Enable access control |
| `acl.roles[x].name` | The name of the role. |
| `acl.roles[x].routers[x].path` | The path pattern. |
| `acl.roles[x].routers[x].method` | The HTTP method to be used for the route. can use wildcard |

```js
"oauth": {
    enable: true,
    before: true,
    routers: [
        {
            path: "*",
            method: "get"
        }
    ],
    server: {
        url: "http://keycloak.example.com",
        realm: "raccoon",
        clientId: "account",
        clientSecret: "clientSecret"
    },
    acl: {
        // In best practice, you should setting the acl
        enable: false,
        roles: [
            {
                name: "admin",
                routers: [
                    { path: "/admin/*", method: "GET" },
                    { path: "/api/*", method: "*" }
                ]
            },
            {
                name: "user",
                routers: [
                    { path: "/api/public/*", method: "GET" }
                ]
            }
        ]
    }
}
```

### Statistic mongodb (使用量分析) 設定
:::important[注意事項]
📢 若你需要使用量分析的功能，請先參考 <Link to="#Logging-System" label="Logging System" withBase={false} /> 的安裝方式，讓 log 同步到資料庫才能進行使用量分析
:::

- plugin name: `statistic-mongodb`

| 欄位名稱 | 描述 |
| --- | --- |
| mongodb.hosts | mongodb 連接的 hosts |
| mongodb.ports | mongodb 連接的 hosts 對應的 ports |
| mongodb.dbName | mongodb 連接的資料庫名稱 |
| mongodb.urlOptions | mongodb 額外的 url options 設定 |
| mongodb.user | mongodb 連接的使用者名稱 |
| mongodb.password | mongodb 連接的使用者密碼 |
| mongodb.authSource | mongodb 連接時，驗證帳號密碼的資料庫 |

```js
"statistic-mongodb": {
      enable: true,
      before: true,
      routers: [],
      mongodb: {
          hosts: ["127.0.0.1"],
          ports: [27017],
          dbName: "raccoon-logs",
          urlOptions: "",
          user: "root",
          password: "root",
          authSource: "admin"
      }
  }
```

## Logging System

Raccoon 目前使用 fluentd 將 log 同步到額外的資料庫當中，在這裡我們選擇 MongoDB 作為我們的目的地資料庫

### 安裝 MongoDB

1. 從終端機安裝 gnupg 和 curl（如果它們尚未可用）：

```bash
sudo apt-get install gnupg curl
```

2. 匯入MongoDB公共GPG金鑰，請執行以下指令：

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
```

3. 創建清單文件 (source.list.d)

```bash
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

4. 重新載入本地套件資料庫

```bash
sudo apt-get update
```

5. 安裝 MongoDB

```bash
sudo apt-get install -y mongodb-org
```

6. 啟動 MongoDB

```bash
sudo systemctl start mongod
```

7. 測試 MongoDB

```bash
mongosh
```

出現以下內容代表成功

<CenterImage
src="{base}/getting-started/installation/mongodb-installation-check.png"
alt="mongodb installation check"
title="mongodb installation check">
</CenterImage>

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

- 並在 `/etc/fluent/fluent.conf` 文件中添加以下配置：
    
    ```ini
    <source>
      @type tail
      # 請將以下路徑改成自己的路徑
      path /var/log/raccoon/*.log
      # 請將以下路徑改成自己的路徑
      exclude_path ["/var/log/raccoon/raccoon.log", "/var/log/raccoon/raccoon-formatted-audit.log"]
      # 請將以下路徑改成自己的路徑
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
      # 請將以下路徑改成自己的路徑
      path /var/log/raccoon/raccoon-formatted-audit.log
      # 請將以下路徑改成自己的路徑
      pos_file /var/log/raccoon/fluentd-audit.pos
      tag mongo.raccoon-audit
      read_from_head true
    
      <parse>
        @type json
      </parse>
    </source>
    
    <source>
      @type tail
      # 請將以下路徑改成自己的路徑
      path /var/log/raccoon/raccoon.log
      # 請將以下路徑改成自己的路徑
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
      # 請將連接字串改成自己的 mongodb 連接字串
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
    

## OAuth Keycloak 架設
:::note[note]
這裡架設的是 dev 版本，若是要架設 production 版本，請參考官方文件 [Configuring Keycloak for production](https://www.keycloak.org/server/configuration-production)
:::
此章節以 keycloak 為範例，架設 OAuth Server
- 下載 keycloak

```bash
wget https://github.com/keycloak/keycloak/releases/download/20.0.2/keycloak-20.0.2.tar.gz
```

- 解壓縮

```bash
tar xzvf keycloak-20.0.2.tar.gz
```

- 移到 keycloak/bin 目錄底下

```bash
cd keycloak-20.0.2/bin
```

設定 Keycloak admin 帳號密碼

- 設定帳號

```bash
export KEYCLOAK_ADMIN="admin"
```

- 設定密碼

```bash
export KEYCLOAK_ADMIN_PASSWORD="test"
```

### 部屬 Keycloak

- 部屬 development 環境版本

```bash
./kc.sh start-dev
```

- 開啟 http://127.0.0.1:8080
<CenterImage
    src="{base}/getting-started/installation/keycloak-welcome.png"
    title="Keycloak Welcome 畫面"
    alt="Keycloak Welcome 畫面"
/>

- 點擊 **`Administration Console`** 進入 admin 登入頁面

<CenterImage
    src="{base}/getting-started/installation/keycloak-admin-login-page.png"
    title="Keycloak Admin 登入畫面"
    alt="Keycloak Admin Console Login Page"
/>

#### https_required 問題

若你遇到 https_required 的問題，你可以輸入以下指令解決此問題

- 進到 /opt/keycloak/bin

```bash
./kcadm.sh config credentials --server http://localhost:8080 --realm master --user admin \
./kcadm.sh update realms/master -s sslRequired=NONE --server http://localhost:8080
```

- 若有創建新的 realm，請記得再執行一次，其中 realms/master 的 master，需要替換為你的 realm 的名稱

### 創建 Realm
首先，我們必須創建一個 Realm，通常我們不太建議與 `Master` 共用，因為這樣安全性相對較低

- 點擊左上角 master 下拉式選單
- 點擊 `Create Realm`
<CenterImage
    src="{base}/getting-started/installation/keycloak-create-realm.png"
    title="Keycloak 創建 Realm"
    alt="Keycloak Create Realm"
/>

- 輸入 Realm 名稱並按下 Create

<CenterImage
    src="{base}/getting-started/installation/keycloak-create-realm-enter.png"
    title="Keycloak 創建 Realm Step 2"
    alt="Keycloak Create Realm Step 2"
/>

### 創建帳號
- 創建帳號
- 點擊 Users
<CenterImage
    src="{base}/getting-started/installation/keycloak-click-side-user.png"
    title="Keycloak 點擊 User"
    alt="Keycloak click user in sidebar"
/>
- 點擊 `Create new user`
<CenterImage
    src="{base}/getting-started/installation/keycloak-click-create-new-user.png"
    title="Keycloak 點擊 Create new user"
    alt="Keycloak click create new user"
/>
- 基本輸入 username 即可，如果需要更嚴謹的管控，請記得加入其他資訊
<CenterImage
    src="{base}/getting-started/installation/keycloak-create-user-page.png"
    title="Keycloak 創建帳號頁面"
    alt="Keycloak Create User Page"
/>
- 創建完，會跳到此帳號的資訊，請跳到 Credentials 設定密碼 (Set password)
<CenterImage
    src="{base}/getting-started/installation/keycloak-user-set-password.png"
    title="Keycloak 設定帳號的密碼頁面"
    alt="Keycloak User Set Password Page"
/>

### ❗新增 Client scope
- 來源：https://keycloak.discourse.group/t/issue-on-userinfo-endpoint-at-keycloak-20/18461/7
:::important[注意事項]
你必須進行此步驟，新版必須要自行加入 openid 的 scope 才能使用
:::
- 點擊左邊的 `Client scopes`，並點擊 `Create client scope`
<CenterImage
    src="{base}/getting-started/installation/keycloak-create-client-scope-step1.png"
    title="Keycloak Create Client Scope Step 1"
    alt="Keycloak Create Client Scope Step 1"
/>
- Name 填入 openid，並點擊 Save 儲存
<CenterImage
    src="{base}/getting-started/installation/keycloak-create-client-scope-step2.png"
    title="Keycloak Create Client Scope Step 2"
    alt="Keycloak Create Client Scope Step 2"
/>

#### 為 Client 加入 Client scope
- 選擇左邊 `Clients` 並選擇要加入 scope 的 Client 名稱 (這裡以 account 為例)
<CenterImage
    src="{base}/getting-started/installation/keycloak-add-scope-for-client-step1.png"
    title="Keycloak Add Scope For Client Step 1"
    alt="Keycloak Add Scope For Client Step 1"
/>
- 選擇 `Client scopes` ，並點擊 `Add client scope`
<CenterImage
    src="{base}/getting-started/installation/keycloak-add-scope-for-client-step2.png"
    title="Keycloak Add Scope For Client Step 2"
    alt="Keycloak Add Scope For Client Step 2"
/>
- 勾選剛剛創建的 openid ，點擊 Add，並選擇 Default
<CenterImage
    src="{base}/getting-started/installation/keycloak-add-scope-for-client-step3.png"
    title="Keycloak Add Scope For Client Step 3"
    alt="Keycloak Add Scope For Client Step 3"
/>

### 將 realm_access 的資訊暴露到 token
- 在驗證是否是 admin 時，我們會需要 `realm_access` 這個欄位
- 我們可以透過開啟 `Full scope allowed` 以便我們可以看到所有欄位

#### 只暴露 realm_access
:::important[注意事項]
請使用自己創建的 client，不要使用內建的 client
:::
1. 點擊左邊 `Clients` -> 點擊自己創建的 Client (這裡是 `raccoon`)
<CenterImage
    src="{base}/getting-started/installation/keycloak-add-realm-access-client-step1.png"
    title="Keycloak Expose Roles in Token Step 1"
    alt="Keycloak Expose Roles in Token Step 1"
/>

2. 點擊 `Client scopes` -> 點擊 `raccoon-dedicated`
<CenterImage
    src="{base}/getting-started/installation/keycloak-add-realm-access-client-step2.png"
    title="Keycloak Expose Roles in Token Step 2"
    alt="Keycloak Expose Roles in Token Step 2"
/>

3. 點擊 `Add mapper` 並打勾 -> 點擊 `Add`
<CenterImage
    src="{base}/getting-started/installation/keycloak-add-realm-access-client-step3.png"
    title="Keycloak Expose Roles in Token Step 3"
    alt="Keycloak Expose Roles in Token Step 3"
/>

4. 找到 `realm roles` 打勾 -> 點擊 `Add`
<CenterImage
    src="{base}/getting-started/installation/keycloak-add-realm-access-client-step4.png"
    title="Keycloak Expose Roles in Token Step 4"
    alt="Keycloak Expose Roles in Token Step 4"
/>

#### 暴力法 (將所有 scope 暴露)
1. 點擊左邊 `Clients` -> 點擊 `account`
<CenterImage
    src="{base}/getting-started/installation/keycloak-token-expose-roles-1.png"
    title="Keycloak Expose All Scopes in Token Step 1"
    alt="Keycloak Expose All Scopes in Token Step 1"
/>

2. 點擊 `Clients scopes` -> 點擊 `account-dedicated`
<CenterImage
    src="{base}/getting-started/installation/keycloak-token-expose-roles-2.png"
    title="Keycloak Expose All Scopes in Token Step 2"
    alt="Keycloak Expose All Scopes in Token Step 2"
/>

3. 點擊 `Scope` -> 將 `Full scope allowed` 開啟
<CenterImage
    src="{base}/getting-started/installation/keycloak-token-expose-roles-3.png"
    title="Keycloak Expose All Scopes in Token Step 3"
    alt="Keycloak Expose All Scopes in Token Step 3"
/>



### Keycloak 常用的 API endpoint
- 來源: https://www.keycloak.org/docs/latest/securing_apps/#available-endpoints

## 部署

運行以下指令開啟 raccoon

```bash
node server.js
```

## 使用 docker-compose
:::important[注意事項]
以下使用的 compose file 並無 keycloak，請自行上網參閱
:::

- 請確保一開始的檔案目錄結構長這樣，也就是在raccoon專案的上一層
```bash
.
└───raccoon-dicom
```
- 複製 raccoon-dicom 裡的`docker-compose.fluent.example.yaml`到當前檔案目錄並命名為`docker-compose.yaml`
- 其內容如下
```yaml
name: raccoon

volumes:
  raccoon_modules:

x-logging: &logging
  driver: json-file
  options:
    max-size: 50m
    max-file: 3

networks:
  db:
    driver: bridge
  backend:
    driver: bridge

configs:
  raccoon-plugins:
    file: ./raccoon-plugins.config.js

services:
  raccoon-postgres:
    image: postgres:16-alpine
    container_name : raccoon-postgres
    restart: unless-stopped
    ports:
      - 5432:5432
    volumes:
      - ./raccoon-postgres:/var/lib/postgresql/data
    environment:
      # provide your credentials here
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      TZ: Asia/Taipei
    networks:
      - db
    logging: *logging
    
  raccoon:
    build:
      context : ./raccoon-dicom
      dockerfile : Dockerfile-fluent
    container_name: raccoon
    # 若你擁有 gitlab.dicom.tw 的權限
    # 可以更改把 image 成 gitlab-registry.dicom.tw/a5566qq123/raccoon-dicom:2.2.0
    # 也請記得將 build 區塊刪除
    image: raccoon:2.2.0
    env_file:
      - ./raccoon.env
    configs:
      - source: raccoon-plugins
        target: /nodejs/raccoon/plugins/config.js
    volumes :
      # 當使用 gitlab 的 Image 時，請記得修改 raccoon-storage 的權限
      # 第一種 sudo chmod -R 777 raccoon-storage
      # 第二種 sudo chown -R 999:999 raccoon-storage
      - ./raccoon-storage:/dicomFiles
      # 當使用 gitlab 的 Image 時，可刪除下面的 volumes
      - raccoon_modules:/nodejs/raccoon/node_modules
    ports:
      - 8081:8081
      - 11112:11112
    depends_on:
      - raccoon-postgres
    restart: unless-stopped
    networks:
      - db
      - backend
    logging: *logging

  fluentd-mongo:
    image: mongo:7.0
    container_name: fluentd-mongo
    volumes:
      - ./raccoon-fluentd-mongo:/data/db
    restart: unless-stopped
    environment:
      TZ: Asia/Taipei
      MONGO_INITDB_ROOT_USERNAME: ${FLUENT_MONGODB_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${FLUENT_MONGODB_PASSWORD}
    networks:
      - backend
    logging: *logging
```
- 複製後的檔案目錄應該長這樣
```bash
.
│   docker-compose.yaml
│
└───raccoon-dicom
```


### 創建 .env 檔案
- 在目錄下創建`.env`檔案，此檔案是給 docker-compose 使用的
- 創建後，檔案目錄如下
```bash
.
│   .env
│   docker-compose.yaml
│
└───raccoon-dicom
```
- 內容輸入如下
:::important[注意事項]
此為 example，在真實使用上請務必更動成安全的帳號密碼設定
:::
```sh
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
FLUENT_MONGODB_USER=root
FLUENT_MONGODB_PASSWORD=root
```
### 設定 raccoon.env
- 複製 `raccoon-dicom` 內的 `.env.template` 檔案至當前目錄且命名為 `raccoon.env`
- 複製後，檔案目錄如下
```sh
.
│   .env
│   docker-compose.yaml
│   raccoon.env
│
└───raccoon-dicom
```
- 修改 `raccoon.env` 檔案，原先的檔案沒有`FLUENT_MONGODB_USER`以及`FLUENT_MONGODB_PASSWORD`，請務必自行加入這兩個設定，其餘設定請按照自己的需求修改
```sh
# ...省略
FLUENT_MONGODB_USER=root
FLUENT_MONGODB_PASSWORD=root
# ...省略
```

### 設定 raccoon-plugins.config.js
- 複製`raccoon-dicom/plugins/config.example.js` 到當前目錄，並命名為`raccoon-plugins.config.js`
- 複製後，檔案目錄如下
```sh
.
│   .env
│   docker-compose.yaml
│   raccoon-plugins.config.js
│   raccoon.env
│
└───raccoon-dicom
```
- 請依照自己的需求修改 `raccoon-plugins.config.js` 檔案

### docker compose 部屬
- 上面的檔案都設定完之後，請執行以下指令以 docker compose 啟動 raccoon
```sh
sudo docker compose up
```

## 測試案例

### 上傳影像

#### 使用 curl

1. 使用 cmd (終端機)進到擁有測試 DICOM 檔案的資料夾
2. 輸入以下指令執行上傳影像動作
```bash
curl --location --request POST "[Service URL]/dicom-web/studies" --header "Accept: application/dicom+json" --header "Content-Type: multipart/related; type=\"application/dicom\"" --form "file=@[path-to-dicoms]/test.dcm;type=application/dicom"
```

:::note[注意事項]
- 請務必將 [Service URL] 更改為 Raccoon 的網址，例如：http://127.0.0.1:8081
- 請務必將 [path-to-dicoms] 更改為擁有測試 DICOM 檔案的資料夾的路徑
- 請務必將 test.dcm 更改為測試 DICOM 檔案的檔案名稱
:::

3. 成功上傳後，Raccoon會回傳 json 資料，如下圖所示，請注意 00081198 的 Value 必須為空陣列，且00081199的陣列必須有 1 筆資料才算上傳成功

<CenterImage
  src="{base}/getting-started/installation/test-upload-curl.png"
  title="測試上傳影像"
  alt="測試上傳影像"
/>

#### 使用 Postman

:::info[小知識]
請注意，使用 Postman上傳影像是不符合 DICOM 標準的，但你依然可以使用 Postman 測試 Raccoon 的上傳影像功能
:::

1.	開啟 Postman
2.	網址輸入 [Service URL]/dicom-web/studies，其中[Service URL]請替換成 Raccoon的網址，例如：http://127.0.0.1:8081
3.	Postman 切換至 Body 頁面

<CenterImage
    src="{base}/getting-started/installation/test-upload-postman-to-body.png"
    title="Postman 切換至 Body 頁面"
    alt="Postman 切換至 Body 頁面"
/>

4.	型態選擇 form-data

<CenterImage
    src="{base}/getting-started/installation/test-upload-postman-to-form-data.png"
    title="Postman 型態選擇 form-data"
    alt="Postman 型態選擇 form-data"
/>

5.	Key 輸入 file

<CenterImage
    src="{base}/getting-started/installation/test-upload-postman-type-key.png"
    title="Postman Key 輸入 file"
    alt="Postman Key 輸入 file"
/>

6.	型態選擇 File

<CenterImage 
    src="{base}/getting-started/installation/test-upload-postman-choose-file-type.png"
    title="Postman 型態選擇 File"
    alt="Postman 型態選擇 File"
/>

7.	選擇測試的檔案

<CenterImage 
    src="{base}/getting-started/installation/test-upload-postman-choose-file.png"
    title="Postman 選擇測試的檔案"
    alt="Postman 選擇測試的檔案"
/>

8.	Method 選擇 POST

<CenterImage 
    src="{base}/getting-started/installation/test-upload-postman-method-post.png"
    title="Postman Method 選擇 POST"
    alt="Postman Method 選擇 POST"
/>

9.	點擊<img src="{base}/getting-started/installation/postman-send-button.png" alt="post send button"/>上傳
10.	若上傳成功，Status Code 為 200，請注意 00081198 的 Value 必須為空陣列，且00081199的陣列必須有 1 筆資料才算上傳成功

<CenterImage
    src="{base}/getting-started/installation/test-upload-postman-200-result.png"
    title="Postman 測試上傳影像結果"
    alt="Postman 測試上傳影像結果"
/>

### 查詢影像
#### 使用 Postman
1. 開啟 Postman
2. Method 使用 GET
3. 網址輸入 [Service URL]/dicom-web/studies，其中[Service URL]請替換成 Raccoon的網址，例如：http://127.0.0.1:8081
4. 點擊<img src="{base}/getting-started/installation/postman-send-button.png" alt="post send button" />查詢影像
5. Status Code 為 200，且資料為陣列大於等於 1 筆則成功

<CenterImage 
    src="{base}/getting-started/installation/test-query-200-result.png"
    title="Postman 測試查詢影像結果"
    alt="Postman 測試查詢影像結果"
/>

### 下載影像

DICOM 擁有許多下載影像之 API，接下來會測試單張影像(WADO-URI)、影像集(WADO-RS)以及單張渲染影像(WADO-RS Rendered)。
以下所使用之影像為附檔的 `image-000001.dcm` 檔案，UID 資訊如下
1. StudyInstanceUID (0020000D): 1.2.826.0.1.3680043.8.1055.1.20111102150758591.92402465.76095170
2. SeriesInstanceUID (0020000E): 1.2.826.0.1.3680043.8.1055.1.20111102150758591.96842950.07877442
3. SOPInstanceUID (00080018): 1.2.826.0.1.3680043.8.1055.1.20111102150758591.03296050.69180943

#### 使用 Postman 測試單張影像 (WADO-URI)
##### 下載 DICOM 檔案
1. 開啟 Postman
2. Method 使用 GET
3. 網址輸入 

```
[Service URL]/wado?studyUID=1.2.826.0.1.3680043.8.1055.1.20111102150758591.92402465.76095170&seriesUID=1.2.826.0.1.3680043.8.1055.1.20111102150758591.96842950.07877442&objectUID=1.2.826.0.1.3680043.8.1055.1.20111102150758591.03296050.69180943&contentType=application/dicom&requestType=WADO
```
> 其中[Service URL]請替換成 Raccoon的網址，例如：http://127.0.0.1:8081
> 若你想要的是 jpeg 影像，你可以將 contentType 更改為 contentType=image/jpge

4. 點擊<img src="{base}/getting-started/installation/postman-send-button.png" alt="post send button" />下載影像
5. Status Code 為 200，且有資料回傳代表成功

<CenterImage 
    src="{base}/getting-started/installation/test-retrieve-wado-uri-result.png"
    title="Postman 測試下載單張影像 (WADO-URI)結果"
    alt="Postman 測試下載單張影像 (WADO-URI)結果"
/>

6.	你也可以將檔案另存，並使用 DICOM 瀏覽器打開測試

<CenterImage 
    src="{base}/getting-started/installation/test-retrieve-wado-uri-save.png"
    title="Postman 測試下載單張影像 (WADO-URI) - 另存檔案"
    alt="Postman 測試下載單張影像 (WADO-URI) - 另存檔案"
/>

##### 下載 jpeg影像

1. 開啟 Postman
2. Method 使用 GET
3. 網址輸入 
```
[Service URL]/wado?studyUID=1.2.826.0.1.3680043.8.1055.1.20111102150758591.92402465.76095170&seriesUID=1.2.826.0.1.3680043.8.1055.1.20111102150758591.96842950.07877442&objectUID=1.2.826.0.1.3680043.8.1055.1.20111102150758591.03296050.69180943&contentType=image/jpeg&requestType=WADO
```

> 其中[Service URL]請替換成 Raccoon的網址，例如：http://127.0.0.1:8081
> 可以發現 jpeg 影像差別為 contentType 更改為 contentType=image/jpge

4. 點擊<img src="{base}/getting-started/installation/postman-send-button.png" alt="post send button" />下載影像
5. Status Code 為 200，且有jpeg影像回傳代表成功

<CenterImage 
    src="{base}/getting-started/installation/test-retrieve-wado-uri-jpeg-result.png"
    title="Postman 測試下載單張影像 (WADO-URI)結果 - jpeg"
    alt="Postman 測試下載單張影像 (WADO-URI)結果 - jpeg"
/>

#### 使用 Postman 測試影像集 (WADO-RS)
1. 開啟 Postman
2. Method 使用 GET
3. 網址輸入 
```
[Service URL]/dicom-web/studies/1.2.826.0.1.3680043.8.1055.1.20111102150758591.92402465.76095170
```
> 其中[Service URL]請替換成 Raccoon的網址，例如：http://127.0.0.1:8081

4. Status Code 為 200，且有資料則代表下載成功

<CenterImage 
    src="{base}/getting-started/installation/test-retrieve-wado-rs-result.png"
    title="Postman 測試下載影像集 (WADO-RS)結果"
    alt="Postman 測試下載影像集 (WADO-RS)結果"
/>

:::note[注意事項]
請注意，WADO-RS 影像集所下載的資料型態為 Multipart/related，另存檔案是無法直接開啟的，需要自行解析，此文件僅測試服務正常與否。
:::

#### 使用 Postman 測試單張渲染影像 (WADO-RS Rendered)

1. 開啟 Postman
2. Method 使用 GET
3. 網址輸入 
```
[Service URL]/dicom-web/studies/1.2.826.0.1.3680043.8.1055.1.20111102150758591.92402465.76095170/series/1.2.826.0.1.3680043.8.1055.1.20111102150758591.96842950.07877442/instances/1.2.826.0.1.3680043.8.1055.1.20111102150758591.03296050.69180943/frames/1/rendered
```
> 其中[Service URL]請替換成 Raccoon的網址，例如：http://127.0.0.1:8081

4. Status Code 為 200，且有jpeg影像則代表下載成功

<CenterImage 
    src="{base}/getting-started/installation/test-retrieve-wado-rs-rendered-result.png"
    title="Postman 測試下載單張渲染影像 (WADO-RS Rendered)結果"
    alt="Postman 測試下載單張渲染影像 (WADO-RS Rendered)結果"
/>

## 額外閱讀

### 允許 postgresql 接受外部 ip 連接

postgresql 預設只允許 127.0.0.1 以及 [localhost](http://localhost) 連接，若要允許外部的 ip 連接則需要更改 `postgresql.conf` 以及 `pg_hba.conf` 檔案

#### 更改 postgresql.conf

請將 `listen_addresses`更改為以下設定

```ini
listen_addresses = '*'
```

#### 更改 pg_hba.conf

在 `pg_hba.conf` 檔案當中的最下面，加入以下設定，其中 `0.0.0.0/0` 的 ip 位置你可以自行替代想要允許的 ip 範圍

```ini
host all all 0.0.0.0/0 scarm-sha-256
```

### DIMSE APP

- Raccoon-DICOM 參考了 [DCM4CHE QRSCP Tool](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md) 實踐 node-java 的功能，以提供 DIMSE 服務
- 您可以設定 `ENABLE_DIMSE=true` 以啟動 DICOM DIMSE 服務
- Raccoon-dicom 將會為 DIMSE 服務自動產生 `logback.xml` 設定檔以進行日誌記錄的動作
- Raccoon-dicom 的 DIMSE 服務設定除了 `DIMSE_AE_TITLE`、`DIMSE_HOSTNAME` 和 `DIMSE_PORT` 之外，其餘大多與 DCM4CHE 相同，若有需要請參考 [dcm4che-tool-dcmqrscp / README.md](https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcmqrscp/README.md)