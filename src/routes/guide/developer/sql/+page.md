# SQL Version
Raccoon 擁有 SQL 版本，請到 CyLab 的 Gitlab 網站取得
- [CyLab Gitlab Raccoon](https://gitlab.dicom.tw/a5566qq123/raccoon-dicom/-/tree/SQL?ref_type=heads)
    - Branch: SQL

## 修改內容
- SQL 版本幾乎與原先版本差不多
- SQL 的 api 操作都放置於 `api-sql`
    - 多數功能都是繼承原先的 class 或 function 修改而成
- SQL 的 model 資料操作都放置於 `models/sql`

## SQL Schema
- Raccoon SQL 的 Schema 使用 [schemaspy](https://schemaspy.org) 產生
- 網站位置: [Raccoon SQL Schema](/sql-schemaspy/index.html)
