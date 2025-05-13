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
- 在 3.0.0 版本前，我們使用了[knex](https://knexjs.org/guide/migrations.html) 來實作 SQL migration
- 在 3.0.0 版本開始，我們開始使用 sequelize 的專案 [umzug](https://github.com/sequelize/umzug) 替代 CLI 與 `sequelize.sync`

### Migration 過程
- 若你今天想要新增一個表格，請先到 `models/sql-migrations/migrations` 資料夾
- 在這資料夾你會看到很多檔案，這些檔案是依照序號執行的，序號越小越早執行
- 若要新增表格，你必須按照序號新增檔案，e.g. `00021-xxxx.js`
- 每個腳本都會有 `up` 與 `down` 兩個 function
- `up` 是執行遷移的內容
- `down` 是回復遷移的內容
- 以下是 `00020-user-config-table.js` 的內容，你可以參考這個腳本去創建你自己的遷移腳本

```js
const { DataTypes } = require("sequelize");

exports.up = async ({ context }) => {
    /** @type {import("sequelize").Sequelize} */
    let sequelize = context;

    await sequelize.transaction(async (transaction) => {
        let isUserConfigTableExists = await sequelize.getQueryInterface().tableExists("user_config", { transaction });
        if (!isUserConfigTableExists) {
            await sequelize.getQueryInterface().createTable("user_config", {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                config: {
                    type: DataTypes.TEXT
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false
                }
            }, { transaction });

            await sequelize.getQueryInterface().addIndex("user_config", {
                fields: ["user_id"],
                unique: true,
                transaction
            });
        }
    });
};

exports.down = async ({ context }) => {
    /** @type {import("sequelize").Sequelize} */
    let sequelize = context;

    await sequelize.transaction(async (transaction) => {
        let isUserConfigTableExists = await sequelize.getQueryInterface().tableExists("user_config", { transaction });
        if (isUserConfigTableExists) {
            await sequelize.getQueryInterface().dropTable("user_config", { transaction });
        }
    });
};
```

- 當你新增遷移腳本後，只要重新啟動專案，就會自動執行遷移

### 跳過不必要的 Migration 腳本

- 若使用的 Raccoon 版本，已經幫你創建表格，但 Migration 還未執行，你可以使用以下方法，讓 Migration 跳過這些腳本
- 進到你的 SQL 資料庫，會看到一個名為 `SequelizeMeta` 的表格，這個表格會記錄已經跑過的 Migration 腳本
- 你只要將想要跳過的腳本插入到表格，就可以跳過該腳本的遷移，例如:

```sql
INSERT INTO "SequelizeMeta" ("name") VALUES ('00020-user-config-table.js');
```

- 目前完整的跳過 Migration 腳本的 SQL 如下:

```sql
INSERT INTO "SequelizeMeta"
("name")
VALUES('00001-user-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00002-patient-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00003-study-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00004-series-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00005-performing_physician_name-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00006-operators_name-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00007-series_request_attributes-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00008-instance-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00009-dicom_code-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00010-dicom_content_sq-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00011-verifying_observer_sq-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00012-dicom_bulk_data-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00013-dicom_instance_delete_reason-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00014-study_label-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00015-store_error_instances-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00016-mwl_item-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00017-ups_work_item-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00018-ups_request_attributes-table.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00019-ups-subscription-tables.js');
INSERT INTO "SequelizeMeta"
("name")
VALUES('00020-user-config-table.js');
```

## 資料庫備份與還原
### 備份
:::info
以下步驟都是使用 docker 唷，不過移除掉 docker 相關的指令，後面連接的指令也是 postgres 本身的，沒有使用 docker 一樣可以參考
:::

- 輸入以下指令輸出備份檔

```bash
docker exec -i <container_name> pg_dump -U <db_username> <database_name> --format=c --encoding=UTF-8 --no-privileges --no-owner > <database_name>_dump_$(date +%Y-%m-%d_%H_%M_%S).sql
```

:::important[重要事項]
- `<container_name>` 請替換成你的 container 名稱
- `<db_username>` 請替換成你的 postgres 使用者名稱
- `<database_name>` 請替換成你要備份的資料庫名稱
:::

- 範例：

```bash
docker exec -i postgres pg_dump -U postgres raccoon --format=c --encoding=UTF-8 --no-privileges --no-owner > raccoon_dump_$(date +%Y-%m-%d_%H_%M_%S).sql
```

### 還原

- 將 dump 的 sql 複製到 postgres container 內 (**請將 `<your_dump>` 更改成上面備份出來的備份檔名稱以及 `CONTAINER_ID` 更改成 container 名稱或 id**)

```bash
docker cp <your_dump>.sql CONTAINER_ID:/db.dump
```

- 進入 postgres container 當中 (**請將 `CONTAINER_ID` 更改成 container 名稱或 id**)

```bash
docker exec -it CONTAINER_ID bash
```

- 使用 pg_restore 還原剛剛複製進來的 sql 檔案 (**請將 `DB_NAME` 改成你要還原的資料庫名稱**)

```bash
pg_restore -U postgres -d DB_NAME –-clean –-if-exists /db.dump
```