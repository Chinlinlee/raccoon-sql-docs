<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";

    let host = "{host}";
    let realm = "{realm}";
</script>

# OAuth 插件
此插件會為 Raccoon 加入 middleware，在進到主要程序前，會至指定的驗證伺服器驗證使用者提供的 Token 是否有效

## 設定檔
- 請修改 `plugins/config.js`
```js
module.exports.pluginsConfig = {
    // 省略...
    // 加入以下內容
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
        adminRouters: [
            {
                path: "audit-log",
                method: "get"
            }
        ]
    }
};
```

### 設定值說明
| Key | Description |
| --- | --- |
| `routers[x].path` | The path pattern that matches all routes. |
| `routers[x].method` | The HTTP method to be used for the route. |
| `server.url` | The URL of the server. |
| `server.realm` | The realm for authentication. |
| `server.clientId` | The client ID for authentication. |
| `server.clientSecret` | The client secret for authentication. |
| `adminRouters[x].path` | The path for the audit log route. |
| `adminRouters[x].method` | The HTTP method to be used for the audit log route. |

## 測試案例
- 使用 postman 呼叫 GET http://127.0.0.1:8081/dicom-web/studies/，若設定成功，會出現 401 Unauthorized 的錯誤

<CenterImage
    src="{base}/plugin-list/oauth/postman-401.png"
    alt="postman first request 401"
    title="postman 第一次呼叫回傳401"
/>

- postman 切換到 Auth 頁面 
- 選擇 OAuth 2.0 
- 輸入 Auth URL (keycloak 正常為: https://keycloak.example.com/realms/{realm}/protocol/openid-connect/auth)
- 輸入 Access Token URL (keycloak 正常為: https://keycloak.dicom.tw/realms/{realm}/protocol/openid-connect/token)
- 輸入 Client ID
- 輸入 Client Secret
- 輸入 scope (必須要有 openid)

<CenterImage
    src="{base}/plugin-list/oauth/postman-oauth-settings.png"
    alt="postman oauth settings"
    title="postman oauth 設定"
/>

- 設定完畢後，點擊最下方的 `Generate New Access Token` 按鈕
- 登入帳號密碼
- 成功會跳回 postman，並點擊 process 按鈕
- 點擊 use token 按鈕
- 再重新呼叫 API，就可以成功拿到資料了！

<CenterImage
    src="{base}/plugin-list/oauth/postman-token-200.png"
    alt="postman token 200"
    title="postman 使用 token 後成功取得資料"
/>