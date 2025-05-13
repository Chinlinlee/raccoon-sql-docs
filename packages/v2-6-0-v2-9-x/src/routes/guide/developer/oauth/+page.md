<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";
</script>

# Raccoon OAuth 串接

本章節將會說明 Raccoon 啟動 OAuth 的兩種方式，由於 Raccoon 只是放置資源的 Server，所以屬於 Resource Owner，只需要把 Client 傳送的 Authorization Header 傳送至 OAuth Authorization Server 驗證並傳回即可。

-   若你不了解 OAuth 的流程，非常建議看這系列的文章 [OAuth 2.0 筆記 (1) 世界觀](https://blog.yorkxin.org/posts/oauth2-1-introduction/)
-   以下使用 Keycloak 作為 OAuth Server

## 第一種: 使用 Raccoon 的 plugin

-   設定 plugins/config.js
-   在 plugin 當中新增 oauth 區塊
-   設定如下

```javascript
module.exports.pluginsConfig = {
    oauth: {
        enable: true,
        before: true,
        routers: [
            {
                // 使用 * 將會套用到所有 route
                path: "*",
                method: "get"
            }
        ],
        server: {
            // 你的 keycloak 的網址
            url: "http://162.38.2.1:8080",
            // 你的 keycloak 的 realm 名稱
            realm: "dog",
            // 你的 keycloak 的 client id
            clientId: "account",
            // 你的 keycloak 的 client secret
            clientSecret: "<client-secret>"
        }
    }
};
```

-   當開啟此 plugin 後， raccoon 將會針對設定的 router path 加入 oauth 的 middleware，將 headers 中的 authorization token 傳至 authorization server 驗證，若驗證失敗會回傳 401 Unauthorized

## 第二種: 透過 Nginx

在生產環境當中，我們通常會透過 Nginx 來代理我們的服務，當過多的服務都需要 oauth 時，你可能需要每個服務都實作 oauth 的功能 (這將造成大量重複程式碼以及維護性較低的問題)，不過 nginx 也可以幫助你做到這個事情，nginx 有提供在設定檔編寫 lua 語言的功能，不過原生的 nginx 安裝 Lua 有點麻煩，這裡推薦使用 [openresty](https://openresty.org/)，這是一個已經內建 lua 引擎的 nginx，可以省去 nginx 安裝 Lua 的繁瑣步驟。

由於大家看到這章節，也許不會有 openresty，以下內容將包含安裝到設定

### 使用 Docker-Compose 安裝 Openresty

-   創建 `openresty-dockerfile` 檔案

```dockerfile
FROM openresty/openresty:alpine-fat
LABEL author="a5566qq2581@gmail.com"
RUN /usr/local/openresty/luajit/bin/luarocks install lua-cjson
RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-jwt
RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-session
RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-http
RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-openidc
RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-string
```

-   創建 `./nginx/nginx.conf`

<Expansion title="./nginx/nginx.conf">

```shellscript
    # nginx.conf  --  docker-openresty
    #
    # This file is installed to:
    #   `/usr/local/openresty/nginx/conf/nginx.conf`
    # and is the file loaded by nginx at startup,
    # unless the user specifies otherwise.
    #
    # It tracks the upstream OpenResty's `nginx.conf`, but removes the `server`
    # section and adds this directive:
    #     `include /etc/nginx/conf.d/*.conf;`
    #
    # The `docker-openresty` file `nginx.vh.default.conf` is copied to
    # `/etc/nginx/conf.d/default.conf`.  It contains the `server section
    # of the upstream `nginx.conf`.
    #
    # See https://github.com/openresty/docker-openresty/blob/master/README.md#nginx-config-files
    #

    #user nobody;
    #worker_processes 1;

    # Enables the use of JIT for regular expressions to speed-up their processing.

    pcre_jit on;

    #error_log logs/error.log;
    #error_log logs/error.log notice;
    #error_log logs/error.log info;

    #pid logs/nginx.pid;

    events {
    worker_connections 1024;
    }

    http {
    include mime.types;
    default_type application/octet-stream;

        # Enables or disables the use of underscores in client request header fields.
        # When the use of underscores is disabled, request header fields whose names contain underscores are marked as invalid and become subject to the ignore_invalid_headers directive.
        # underscores_in_headers off;

        #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
        #                  '$status $body_bytes_sent "$http_referer" '
        #                  '"$http_user_agent" "$http_x_forwarded_for"';

        #access_log  logs/access.log  main;

            # Log in JSON Format
            # log_format nginxlog_json escape=json '{ "timestamp": "$time_iso8601", '
            # '"remote_addr": "$remote_addr", '
            #  '"body_bytes_sent": $body_bytes_sent, '
            #  '"request_time": $request_time, '
            #  '"response_status": $status, '
            #  '"request": "$request", '
            #  '"request_method": "$request_method", '
            #  '"host": "$host",'
            #  '"upstream_addr": "$upstream_addr",'
            #  '"http_x_forwarded_for": "$http_x_forwarded_for",'
            #  '"http_referrer": "$http_referer", '
            #  '"http_user_agent": "$http_user_agent", '
            #  '"http_version": "$server_protocol", '
            #  '"nginx_access": true }';
            # access_log /dev/stdout nginxlog_json;

        # See Move default writable paths to a dedicated directory (#119)
        # https://github.com/openresty/docker-openresty/issues/119
        client_body_temp_path /var/run/openresty/nginx-client-body;
        proxy_temp_path       /var/run/openresty/nginx-proxy;
        fastcgi_temp_path     /var/run/openresty/nginx-fastcgi;
        uwsgi_temp_path       /var/run/openresty/nginx-uwsgi;
        scgi_temp_path        /var/run/openresty/nginx-scgi;

        sendfile        on;
        #tcp_nopush     on;

        #keepalive_timeout  0;
        keepalive_timeout  65;

        #gzip  on;

        include /etc/nginx/conf.d/*.conf;

        # Don't reveal OpenResty version to clients.
        # server_tokens off;

    }

```

<div slot="icon-fold" class="w-1em h-1em">
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="black" d="M15.948 2h.065a10.418 10.418 0 0 1 .972.528l10.858 6.246a.792.792 0 0 1 .414.788c-.008 4.389 0 8.777-.005 13.164a.813.813 0 0 1-.356.507q-5.773 3.324-11.547 6.644a.587.587 0 0 1-.657.037q-5.78-3.314-11.549-6.64a.7.7 0 0 1-.4-.666V9.445a.693.693 0 0 1 .387-.67q5.422-3.118 10.844-6.24c.322-.184.638-.379.974-.535"/><path fill="#fff" d="M8.767 10.538v10.859a1.509 1.509 0 0 0 .427 1.087a1.647 1.647 0 0 0 2.06.206a1.564 1.564 0 0 0 .685-1.293c0-2.62-.005-5.24 0-7.86q3.583 4.29 7.181 8.568a2.833 2.833 0 0 0 2.6.782a1.561 1.561 0 0 0 1.251-1.371q.008-5.541 0-11.081a1.582 1.582 0 0 0-3.152 0c0 2.662-.016 5.321 0 7.982c-2.346-2.766-4.663-5.556-7-8.332a2.817 2.817 0 0 0-2.649-1.052a1.579 1.579 0 0 0-1.403 1.505"/></svg>
</div>
<div slot="icon-expanded" class="i-vscode-icons:file-type-nginx w-1em h-1em"></div>
</Expansion>

-   創建 `./nginx/conf.d/default.conf`
    -   以下內容包含 oauth 的設定
    -   其中這些參數請記得替換成自己的數值:
    -   `keycloak_host` 為 keycloak 的 host
    -   `realm_name` 為 keycloak 的 realm 名稱
    -   `client_id` 為 keycloak 的 client id
    -   `client_secret` 為 keycloak 的 client secret

<Expansion title="./nginx/conf.d/default.conf">

```shellscript
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }


    location ~^/raccoon {

        access_by_lua '
            local opts = {
                ssl_verify = "no",
                discovery = "http://{keycloak_host}/realms/{realm_name}/.well-known/openid-configuration",
                client_id = "{client_id}",
                client_secret = "{client_secret}",
                introspection_endpoint="http://{keycloak_host}/realms/{realm_name}/protocol/openid-connect/token/introspect"
            }
            local res, err = require("resty.openidc").introspect(opts)
            if err then
                ngx.status = 403
                ngx.say(err)
                ngx.exit(ngx.HTTP_FORBIDDEN)
            end
        ';

        rewrite ^/raccoon/(.*)$ /$1 break;
        proxy_pass http://raccoon:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        client_max_body_size 0; # Allows file uploads up to 100 MB
    }
}
```

<div slot="icon-fold" class="w-1em h-1em">
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="black" d="M15.948 2h.065a10.418 10.418 0 0 1 .972.528l10.858 6.246a.792.792 0 0 1 .414.788c-.008 4.389 0 8.777-.005 13.164a.813.813 0 0 1-.356.507q-5.773 3.324-11.547 6.644a.587.587 0 0 1-.657.037q-5.78-3.314-11.549-6.64a.7.7 0 0 1-.4-.666V9.445a.693.693 0 0 1 .387-.67q5.422-3.118 10.844-6.24c.322-.184.638-.379.974-.535"/><path fill="#fff" d="M8.767 10.538v10.859a1.509 1.509 0 0 0 .427 1.087a1.647 1.647 0 0 0 2.06.206a1.564 1.564 0 0 0 .685-1.293c0-2.62-.005-5.24 0-7.86q3.583 4.29 7.181 8.568a2.833 2.833 0 0 0 2.6.782a1.561 1.561 0 0 0 1.251-1.371q.008-5.541 0-11.081a1.582 1.582 0 0 0-3.152 0c0 2.662-.016 5.321 0 7.982c-2.346-2.766-4.663-5.556-7-8.332a2.817 2.817 0 0 0-2.649-1.052a1.579 1.579 0 0 0-1.403 1.505"/></svg>
</div>
<div slot="icon-expanded" class="i-vscode-icons:file-type-nginx w-1em h-1em"></div>
</Expansion>

-   創建 `docker-compose.yaml`

<Expansion title="docker-compose.yaml">

```yaml
version: "3"

services:
    openresty:
        build:
            context: ./
            dockerfile: openresty-dockerfile
        image: openresty-custom
        container_name: openresty
        restart: always
        ports:
            - "80:80"
            - "11112:11112"
        volumes:
            - ./nginx/nginx.conf:/usr/local/openresty/nginx/nginx.conf
            - ./nginx/conf.d:/etc/nginx/conf.d
            - ./nginx/logs:/usr/local/openresty/nginx/logs
        environment:
            - TZ=Asia/Taipei
```

<div slot="icon-fold" class="w-1em w-1em">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="black" d="M16.54 12.663h2.86v2.924h1.446a6.272 6.272 0 0 0 1.988-.333a5.091 5.091 0 0 0 .966-.436a3.584 3.584 0 0 1-.67-1.849a3.907 3.907 0 0 1 .7-2.753l.3-.348l.358.288a4.558 4.558 0 0 1 1.795 2.892a4.375 4.375 0 0 1 3.319.309l.393.226l-.207.4a4.141 4.141 0 0 1-4.157 1.983c-2.48 6.168-7.871 9.088-14.409 9.088c-3.378 0-6.476-1.263-8.241-4.259l-.029-.049l-.252-.519a8.316 8.316 0 0 1-.659-4.208l.04-.433h2.445v-2.923h2.861V9.8h5.721V6.942h3.432z"/><path fill="white" d="M12.006 24.567a6.022 6.022 0 0 1-3.14-3.089a10.329 10.329 0 0 1-2.264.343q-.5.028-1.045.028q-.632 0-1.331-.037a9.051 9.051 0 0 0 7 2.769q.392 0 .78-.014M7.08 13.346h.2v2.067h-.2Zm-.376 0h.2v2.067H6.7v-2.067Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.368 0h.2v2.067h-.2zM5 13.14h2.482v2.479H5Zm2.859-2.861h2.48v2.479H7.863Zm2.077.207h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.368 0h.2v2.066h-.2Zm-.207 2.653h2.48v2.48H7.863V13.14Zm2.077.207h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.368 0h.2v2.067h-.2Zm2.654-.207H13.2v2.48h-2.48V13.14Zm2.076.207H13v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.368 0h.2v2.067h-.2Zm-.206-3.067H13.2v2.479h-2.48v-2.479Zm2.076.207H13v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.368 0h.2v2.066h-.2Zm2.654 2.653h2.479v2.48h-2.48V13.14Zm2.076.207h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.368 0h.192v2.067h-.2v-2.067Zm-.206-3.067h2.479v2.479h-2.48zm2.076.207h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.368 0h.192v2.066h-.2v-2.066Zm-.206-3.067h2.479V9.9h-2.48zm2.076.206h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.376 0h.2v2.066h-.2Zm-.368 0h.192v2.066h-.2V7.625Zm2.654 5.514h2.479v2.48h-2.48V13.14Zm2.076.207h.195v2.067h-.2v-2.067Zm-.376 0h.206v2.067h-.206Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.2Zm-.376 0h.2v2.067h-.205v-2.067Zm-.368 0h.2v2.067h-.194v-2.067Zm-6.442 6.292a.684.684 0 1 1-.684.684a.684.684 0 0 1 .684-.684m0 .194a.489.489 0 0 1 .177.033a.2.2 0 1 0 .275.269a.49.49 0 1 1-.453-.3Z"/></svg>
</div>
<div slot="icon-expanded" class="i-vscode-icons:file-type-docker2 w-1em h-1em"></div>

</Expansion>

-   啟動

```bash
sudo docker compose up openresty
```

## 測試

-   以下將使用 postman 進行測試

### 如何於 postman 取得 token

#### 在 keycloak 新增 postman redirect url

-   開啟你的 keycloak 設定
-   進入 `Clients` 頁面
-   選擇你的 `Client`
-   在 `Valid redirect URLs` 的區塊加入 `https://oauth.pstmn.io/v1/callback`

<CenterImage src="{base}/oauth/add-postman-redirect-url.png" alt="add-postman-redirect-url" title="keycloak 新增 postman redirect url"></CenterImage>

#### postman 設定

-   點擊 `Auth`
-   `Type` 選擇 `OAuth 2.0`

<CenterImage
src="{base}/oauth/postman-set-oauth-1.png"
alt="postman-set-oauth-1"
title="postman 設定 oauth 第一步"></CenterImage>

- 填入 `Auth URL`
    - 通常為 `http://[keycloak_host]/realms/[realm_name]/protocol/openid-connect/auth`
- 填入 `Access Token URL`
    - 通常為 `http://[keycloak_host]/realms/[relam_name]/protocol/openid-connect/token`
- 填入 `Client ID`
- 填入 `Client Secret`

<CenterImage
src="{base}/oauth/postman-set-oauth-2.png"
alt="postman-set-oauth-2"
title="postman 設定 oauth 第二步"></CenterImage>

- 點擊 `Get New Access Token`

<CenterImage
src="{base}/oauth/postman-generate-token.png"
alt="postman-generate-token"
title="postman 產生 oauth token"></CenterImage>

- 點擊後會跳出 keycloak 的登入畫面
- 登入後，會回到 postman 上面
- 最後就是點擊，`Use Token` 開始使用 Token 囉！

### 第一種方法的測試

-   未使用 token 直接呼叫 QIDO-RS API

<CenterImage src="{base}/oauth/test-1-without-token.png" alt="test-1-without-token" title="無 token 呼叫 QIDO-RS API"></CenterImage>

> 可以看到回傳了 401 Unauthorized 的狀態

-   使用 token 呼叫 QIDO-RS API

<CenterImage src="{base}/oauth/test-1-with-token.png" alt="test-1-with-token" title="使用 token 呼叫 QIDO-RS API"></CenterImage>

### 第二種方法的測試
-   未使用 token 呼叫 QIDO-RS API

<CenterImage
src="{base}/oauth/test-2-without-token.png"
alt="test-2-without-token"
title="無 token 呼叫 QIDO-RS API"></CenterImage>

-   使用 token 呼叫 QIDO-RS API

<CenterImage
src="{base}/oauth/test-2-with-token.png"
alt="test-2-with-token"
title="使用 token 呼叫 QIDO-RS API"></CenterImage>

## 參考資料

-   [Keycloak Available Endpoints](https://www.keycloak.org/docs/latest/securing_apps/#available-endpoints)
