<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";

</script>

# v2 to v3 資料庫遷移

:::warning[注意事項]
- 在進行遷移之前，請務必先備份資料庫
- 在進行遷移之前，請務必先備份資料庫
- 在進行遷移之前，請務必先備份資料庫
可參考 [資料庫備份與還原](../developer/sql#資料庫備份與還原)
:::

## 本地遷移步驟

- 以下是使用 v2.4.1 版本的資料庫進行遷移的過程

:::info
以下所有步驟請記得先進到 raccoon 專案內，在執行指令
:::

- 先進到 raccoon 更改 dotenv 內 SQL 連接的資訊，請更改成要被遷移的資料庫資訊
```toml
SQL_HOST="127.0.0.1"
SQL_PORT="5432"
SQL_DB="raccoon_lun"
SQL_TYPE="postgres"
SQL_USERNAME="postgres"
SQL_PASSWORD="postgres"
SQL_LOGGING=false
```

- 運行以下指令運行遷移腳本
```bash
node models/sql-migrations/v2-to-v3/index.js 
```

<CenterImage 
    src="{base}/v2-to-v3-migration/exec-console.png"
    alt="exec console print"
    title="執行後的 console print"
/>

## Docker 遷移步驟

- 以下是使用 v2.4.1 版本的資料庫進行遷移的過程

:::warning
- 請先關閉 raccoon 的 docker 服務再進行以下操作
:::

### Docker compose
以下是演示用的 v2.4.1 docker compose 檔案

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

### 更新版本
- 首先，將 docker compose 裡的 tag version 改成 `3.1.1`

:::important[重要事項]
請務必使用 `v3.1.1` 以上的版本，因為在這之前的版本遷移腳本有問題
:::

```yaml
services:
  raccoon-dicom:
    image: gitlab-registry.dicom.tw/a5566qq123/raccoon-dicom:3.1.1
```
- 執行指令，下載新版 image

```bash
sudo docker compose pull raccoon-dicom
```

- 運行以下指令遷移新版本的資料庫

```bash
docker run -it -v ./raccoon.env:/nodejs/raccoon/.env --rm gitlab-registry.dicom.tw/a5566qq123/raccoon-dicom:3.1.1 sh -c "node /nodejs/raccoon/models/sql-migrations/v2-to-v3/index.js"
```
