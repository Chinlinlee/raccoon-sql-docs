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
