<script>
    import { base } from "$app/paths";
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
<figure>
    <img src="{base}/sql/sql-schemaspy-result.png" class="rounded-t h-72 w-full object-scale-down" alt="controller-flow">
    <figcaption>
        <p
            class="text-center text-sm m-1 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
            schemaspy 產生結果
        </p>
    </figcaption>
</figure>
