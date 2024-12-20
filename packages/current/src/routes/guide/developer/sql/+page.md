<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";
</script>

# SQL Version
Raccoon 擁有 SQL 版本，請到 CyLab 的 Gitlab 網站取得
- [CyLab Gitlab Raccoon](https://gitlab.dicom.tw/a5566qq123/raccoon-dicom/-/tree/SQL?ref_type=heads)
    - Branch: dev-sql-b

## 修改內容
- SQL 版本幾乎與原先版本差不多
- SQL 的 多數功能都是繼承原先的 class 或 function 修改而成
- SQL 的 model 資料操作都放置於 `models/sql`

## SQL Schema
- Raccoon SQL 的 Schema 使用 [schemaspy](https://schemaspy.org) 產生
- 網站位置: [Raccoon SQL Schema](/sql-schemaspy/index.html)

### schemaspy 使用
想必你對這個 tool 的使用方式有點好奇，這邊直接給予一些說明
- 以下範例使用 postgresql

#### 下載 JDBC Driver
- 請至 [PostgreSQL JDBC Driver - Download](https://jdbc.postgresql.org/download/) 下載 JDBC Driver

#### 下載 schemaspy
- 請至 [schemaspy - releases](https://github.com/schemaspy/schemaspy/releases) 下載 jar 檔

#### 執行 schemaspy
- 使用以下指令執行 schemaspy
```bash
java -jar schemaspy-6.2.4.jar -t pgsql11 -dp postgresql-42.6.0.jar -db dbName -host host -u user -p password -o .\outputDir
```
:::important[注意事項]
請自行將以下資訊代替為自己架設的 database 的資訊
- dbName
- host
- user
- password
- outputDir
:::

#### 產生結果
<CenterImage src="{base}/sql/sql-schemaspy-result.png" alt="sql schemaspy result" title="schemaspy 產生結果"></CenterImage>

## SQL Migration
- SQL 在訂版後還是會有修改的時機，通常不是很建議透過 `sequelize.sync` 當中的 alter 或 force 進行修改
- sequelize 原本就有提供 migration 的工具，不過跟原本的專案架構對不上
- 這裡採用 [knex](https://knexjs.org/guide/migrations.html) 來實作 SQL migration
- 現在 SQL migration 的檔案都放在 `models/sql-migrations` 資料夾當中
- migration 從 1adb99ad877d28163198c6069241fe2495175776 版本開始實施

### 設定
- 設定檔位置: `models/sql-migrations/knexfile.js`
- 你可以複製 `models/sql-migrations/knexfile.example.js` 進行修改
```js
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'raccoon',
            user: 'username',
            password: 'password',
            host: 'host'
        },
        pool: {
            min: 2,
            max: 10
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'raccoon',
            user: 'username',
            password: 'password',
            host: 'host'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'raccoon',
            user: 'username',
            password: 'password',
            host: 'host'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
```

### migration 指令
完成編寫 migration 後，您可以通過以下方式根據 NODE_ENV 更新資料庫：

```bash
knex migrate:latest
```

你還可以傳遞 --env 標誌或設置 NODE_ENV 來選擇替代環境：
```bash
knex migrate:latest --env production

# 或者

NODE_ENV=production knex migrate:latest
```

要回滾 (rollback) 最後一批遷移 (migration)：
```bash
knex migrate:rollback
```

要回滾 (rollback) 所有已完成的遷移 (migration)：
```bash
knex migrate:rollback --all
```

要執行尚未執行的下一個遷移 (migration)

```bash
knex migrate:up
```

要執行尚未執行的指定遷移 (migration)
```bash
knex migrate:up 001_migration_name.js
```
撤消上次執行的最後一個遷移 (migration)

```bash
knex migrate:down
```

撤消已執行的指定遷移 (migration)
```bash
knex migrate:down 001_migration_name.js
```

列出已完成和待處理的所有遷移 (migration)：
```bash
knex migrate:list
```

### Docker 從舊版更新到新版
今天你可能會遇到，原本版本是 v2.4.1 的 raccoon-dicom 需要更新到 v2.7.0，且環境都是用 Docker 搭建的
這將導致你無法透過原始碼的方式進行遷移，以下將演示如何透過 Docker 指令遷移資料庫

#### Docker compose 
以下是演示用的 v2.4.1 的 docker compose yaml 檔案

```yaml
x-logging: &a1
  driver: json-file
  options:
    max-size: 50m
    max-file: 3
configs:
  raccoon-plugins:
    file: ./raccoon-plugins.config.js
  raccoon-allowed-ae:
    file: ./allowAEs.js
services:
  raccoon-dicom:
    image: gitlab-registry.dicom.tw/a5566qq123/raccoon-dicom:2.4.1
    env_file:
      - ./raccoon.env
    configs:
      - source: raccoon-plugins
        target: /nodejs/raccoon/plugins/config.js
      - source: raccoon-allowed-ae
        target: /nodejs/raccoon/config/allowAEs.js
    volumes:
      - ./raccoon-stroage:/dicomFiles
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped
    logging: *a1
  fluentd-mongo:
    image: mongo:7.0
    container_name: fluentd-mongo
    volumes:
      - ./raccoon-fluentd-mongo:/data/db
    restart: unless-stopped
    environment:
      TZ: Asia/Taipei
      MONGO_INITDB_ROOT_USERNAME: ${FLUENT_MONGODB_USER:-root}
      MONGO_INITDB_ROOT_PASSWORD: ${FLUENT_MONGODB_PASSWORD:-root}
    logging: *a1
  postgres:
    image: postgres:16.4
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ${POSTGRES_DB:-postgres}
    ports:
      - 5432:5432
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    logging: *a1
    healthcheck:
      test:
        - CMD-SHELL
        - pg_isready -U postgres
      interval: 5s
      timeout: 5s
      retries: 5
```

#### 更新版本
- 將 docker-compose.yaml 內的 2.4.1 更改成 2.7.0
- 執行指令下載新 image
```bash
docker compose pull
```
- 執行指令更新 container
```bash
docker compose stop raccoon-dicom
docker compose rm -f raccoon-dicom
docker compose up -d raccoon-dicom
```
#### 遷移
在還沒遷移資料庫前，若你直接啟動 raccoon 並操作，可能會出現下列問題
- column `xxx` not exist
- datatype 錯誤
等等與資料庫操作有關的問題

- 操作前，請關閉 raccoon container 服務
- 創建 knexfile.js
```javascript
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    production: {
        client: 'postgresql',
        connection: {
            database: 'raccoon',
            user: 'postgres',
            password: 'postgres',
            host: "127.0.0.1"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
```
- 複製 raccoon 的 sql-migrations 資料夾
```bash
docker create --name raccoon-dicom-temp gitlab-registry.dicom.tw/a5566qq123/raccoon-dicom:2.7.0 && \
docker cp raccoon-dicom-temp:/nodejs/raccoon/models/sql-migrations ./sql-migrations && \
docker rm raccoon-dicom-temp
```
- 比較版本前後出現的 migration files
    - 例如: 2.4.1 -> 2.7.0 的差別在於多了 `20241204020523_instance-add-md5.js` 檔案
- 按照日期依序執行 migration files
```bash
docker run -it --rm \
  --network raccoon_default \
  -v ./knexfile.js:/nodejs/raccoon/models/sql-migrations/knexfile.js \
  gitlab-registry.dicom.tw/a5566qq123/raccoon-dicom:2.7.0 \
  sh -c "npm i -g knex && npm uninstall -D knex && npm i knex && knex --knexfile ./models/sql-migrations/knexfile.js migrate:up 20241204020523_instance-add-md5.js"
```

:::tip
若出現某個 migration 有問題，但卻用不讓你執行的話，可以嘗試把資料庫的 `knex_migrations` 和 `knex_migrations_lock` 刪除
:::