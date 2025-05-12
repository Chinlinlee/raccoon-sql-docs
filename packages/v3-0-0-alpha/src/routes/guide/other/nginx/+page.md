<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";
</script>

# NGINX Proxy Configuration Guide (NGINX 代理配置指南)

:::info
- 此文件由[伯安 brain](https://github.com/brianshen0522)提供
:::

## Introduction (簡介)

NGINX 是一個強大的網頁伺服器，也可以作為反向代理、負載平衡器和 HTTP 快取。當設定為代理時，NGINX 接收客戶端請求，將它們傳遞給代理伺服器，從這些伺服器檢索回應，然後將它們傳回給客戶端。

## Client Request Body Size (客戶端請求本文大小)

### client_max_body_size

此指令設定客戶端請求本文允許的最大大小。如果請求本文超過此大小，NGINX 會向客戶端返回 413 (Request Entity Too Large) 錯誤。

**語法 (Syntax):** `client_max_body_size size;`  
**預設值 (Default):** `client_max_body_size 1m;`  
**情境 (Context):** http, server, location

大小值可以用位元組、千位元組 (k 或 K) 或百萬位元組 (m 或 M) 指定。

**範例 (Examples):**

```nginx
# 允許最大 10MB 上傳
client_max_body_size 10m;

# 允許最大 100MB 上傳
client_max_body_size 100m;

# 無限制 (不建議用於生產環境)
client_max_body_size 0;
```

**使用案例 (Use Cases):**
- 檔案上傳
- 接收大型 JSON 有效負載的 API 端點
- 包含大量資料的表單提交

**重要注意事項 (Important Notes):**
- 將此值設定得太高可能會使您的伺服器容易受到阻斷服務攻擊 (denial-of-service attacks)
- 將此值設定得太低可能會阻止合法的大型上傳
- 此值應與您配置的任何超時設定保持一致
- 此設定必須容納整個請求本文，包括檔案上傳和表單欄位

## Proxy Buffering Settings (代理緩衝設定)

### proxy_buffering

此指令啟用或停用來自代理伺服器的回應緩衝。

**語法 (Syntax):** `proxy_buffering on|off;`  
**預設值 (Default):** `proxy_buffering on;`  
**情境 (Context):** http, server, location

當啟用緩衝時，NGINX 會盡快從代理伺服器接收回應，並將其儲存在由 `proxy_buffer_size` 和 `proxy_buffers` 指令配置的緩衝區中。如果整個回應無法容納於記憶體中，一部分可以儲存到磁碟上的暫存檔案。

當緩衝停用 (`proxy_buffering off`) 時，回應會在從代理伺服器接收到時同步傳遞給客戶端。這對於以下情況很有用：
- 串流回應 (Streaming responses)
- 即時資料 (Real-time data)
- 當您需要盡快開始向客戶端傳送資料時

**範例 (Example):**
```nginx
# 停用代理緩衝
proxy_buffering off;
```

### Related Buffering Directives (相關緩衝指令)

#### proxy_buffer_size

設定用於讀取從代理伺服器接收到的回應第一部分（通常包含標頭）的緩衝區大小。

**語法 (Syntax):** `proxy_buffer_size size;`  
**預設值 (Default):** `proxy_buffer_size 4k|8k;`  
**情境 (Context):** http, server, location

```nginx
proxy_buffer_size 8k;
```

#### proxy_buffers

設定用於從代理伺服器讀取回應的緩衝區数量和大小。

**語法 (Syntax):** `proxy_buffers number size;`  
**預設值 (Default):** `proxy_buffers 8 4k|8k;`  
**情境 (Context):** http, server, location

```nginx
# 8 個緩衝區，每個 16k
proxy_buffers 8 16k;
```

#### proxy_busy_buffers_size

當啟用緩衝時，限制在回應尚未完全讀取時，可以忙於向客戶端傳送回應的緩衝區總大小。

**語法 (Syntax):** `proxy_busy_buffers_size size;`  
**預設值 (Default):** `proxy_busy_buffers_size 8k|16k;`  
**情境 (Context):** http, server, location

```nginx
proxy_busy_buffers_size 16k;
```

#### proxy_max_temp_file_size

當啟用緩衝時，設定暫存檔案的最大大小。零值會停用暫存檔案的使用。

**語法 (Syntax):** `proxy_max_temp_file_size size;`  
**預設值 (Default):** `proxy_max_temp_file_size 1024m;`  
**情境 (Context):** http, server, location

```nginx
# 將暫存檔案限制為 1GB
proxy_max_temp_file_size 1024m;

# 停用暫存檔案
proxy_max_temp_file_size 0;
```

## Common Proxy Configuration Directives (常用代理配置指令)

### proxy_pass

指定代理伺服器的協定和地址，以及一個可選的 URI，位置應對應到該 URI。

**語法 (Syntax):** `proxy_pass URL;`  
**情境 (Context):** location, if in location

```nginx
# 基本代理到上游伺服器
proxy_pass http://backend_server;

# 使用特定連接埠
proxy_pass http://backend_server:8080;

# 使用 URI
proxy_pass http://backend_server/app/;
```

### proxy_set_header

重新定義或附加欄位到傳遞給代理伺服器的請求標頭。

**語法 (Syntax):** `proxy_set_header field value;`  
**預設值 (Default):**
```
proxy_set_header Host $host;
proxy_set_header Connection close;
```
**情境 (Context):** http, server, location

```nginx
# 常見的設定標頭
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

### proxy_read_timeout

定義從代理伺服器讀取回應的超時時間。

**語法 (Syntax):** `proxy_read_timeout time;`  
**預設值 (Default):** `proxy_read_timeout 60s;`  
**情境 (Context):** http, server, location

```nginx
# 將超時增加到 120 秒
proxy_read_timeout 120s;
```

### proxy_connect_timeout

定義與代理伺服器建立連線的超時時間。

**語法 (Syntax):** `proxy_connect_timeout time;`  
**預設值 (Default):** `proxy_connect_timeout 60s;`  
**情境 (Context):** http, server, location

```nginx
# 設定連線超時為 30 秒
proxy_connect_timeout 30s;
```

## Sample Configurations (範例配置)

### Basic Proxy Configuration (基本代理配置)

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend_server:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Proxy for File Uploads (檔案上傳代理配置)

```nginx
server {
    listen 80;
    server_name upload.example.com;
    
    # 增加檔案上傳的最大本文大小
    client_max_body_size 100m;
    
    location / {
        proxy_pass http://upload_server:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # 增加大型上傳的超時時間
        proxy_connect_timeout 300s;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
```

### Streaming Configuration with Disabled Buffering (停用緩衝的串流配置)

```nginx
server {
    listen 80;
    server_name stream.example.com;
    
    location / {
        proxy_pass http://streaming_server:8080;
        
        # 停用串流內容的緩衝
        proxy_buffering off;
        
        # 傳遞 websocket 連線
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # 標準標頭
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### API Gateway Configuration (API 閘道配置)

```nginx
server {
    listen 80;
    server_name api.example.com;
    
    # API 資料的較大請求大小
    client_max_body_size 10m;
    
    # API 端點
    location /api/v1/users {
        proxy_pass http://user_service:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api/v1/products {
        proxy_pass http://product_service:8002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api/v1/orders {
        # 特別為訂單設定的較大請求大小
        client_max_body_size 20m;
        proxy_pass http://order_service:8003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```