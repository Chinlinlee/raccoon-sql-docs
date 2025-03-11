<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";

</script>

# 如何發布新版本
目前 raccoon 有兩個主要分支 `dev-sql-b` 和 `enterprise-release`

- `dev-sql-b`: 主要是進行功能開發、修正 Bug、重構和代碼更新的地方
- `enterprise-release`: 當 `dev-sql-b` 開發到一定程度後，會切換到此分支，將 `dev-sql-b` merge 過來，並進行版本發布

> 實際上，文件更新，可以在 `dev-sql-b` 和 `enterprise-release` 進行

在版本發布的部分，raccoon 使用 [standard-version](https://github.com/conventional-changelog/standard-version)，透過 conventional message 產生新版的 CHANGELOG 以及自動更改 package.json 的版本

## 在 enterprise-release 發布版本

以下步驟，假設一開始在 `dev-sql-b` 分支
- 切換到 enterprise-release

```bash
git switch enterprise-release
```

- Merge `dev-sql-b` into `enterprise-release` branch

```bash
git merge dev-sql-b
```

- 執行以下指令以更新 package.json 版本和產生 CHANGELOG

```bash
npm run release
```

> raccoon 有設定不進行自動 commit，以進行額外 change log 的補充

- 進行 commit，commit 的訊息請使用以下格式
```
chore: release `vX.X.X`
```

- commit 完畢後，建立 tag

```bash
git tag vX.X.X
```

- 完成後，將更新的內容 push 到 gitlab

```bash
git push --atomic origin enterprise-release vX.X.X
```

## 在 gitlab 創建 release
在新版本建立後，我們會在 gitlab release 的頁面新增一個新的 release，以方便直接查看某版本的更新資訊以及下載 source code

- 進到 gitlab 的 repo (raccoon-dicom) 點擊左邊 Deploy 底下的 release

<CenterImage 
    src="{base}/how-to-release/gitlab-go-to-releases.png"
    alt="gitlab go to releases"
    title="gitlab 進到 releases 頁面"
/>

- 進入後點擊 New release
- 選擇 Tag
- 輸入 release title
- release notes 輸入發布版本的 change log (只要有發布版本的即可，不要複製到舊版的)

<CenterImage
    src="{base}/how-to-release/create-new-release.png"
    alt="create new release"
    title="創建新 release"
/>

- 完成後，點擊 save change 發布


## 上傳 Docker Image
在 lab 的 gitlab 設有 docker registry 供大家使用，這章節將教學如何將 build 出來的 image 上傳到 gitlab

### 創建 Token
- 點擊自己的頭像，點擊 `Edit profile`

<CenterImage 
    src="{base}/how-to-release/click-avatar.png"
    alt="click avatar"
    title="點擊大頭貼"
/>

- 進入 `Access tokens` 頁面
- 點擊 `Add new token`

<CenterImage 
    src="{base}/how-to-release/go-to-add-new-token.png"
    alt="go to add new token"
    title="Add new token"
/>

- 輸入 `Token name`
- 選擇過期日期 (Expiration date)

<CenterImage 
    src="{base}/how-to-release/token-name-and-expiration-date.png"
    alt="enter token name and select expiration date"
    title="輸入 Token name 和選擇 expiration date"
/>

- 務必勾選 `read_registry` 和 `write_registry` 提供 registry 讀寫權限

<CenterImage 
    src="{base}/how-to-release/check-registry-permission.png"
    alt="check registry permission"
    title="打勾 registry 的權限"
/>

- 點擊 `Create personal access token` 創建 token

### 上傳 docker image

- 首先，請先在進行上傳的機器登入 gitlab docker，密碼輸入上面創建的 token

```bash
docker login gitlab-registry.dicom.tw
```

- build image (當然你可以自己 build 好 image 之後使用 tag 的方式改名稱，名稱通常為 `gitlab-registry.dicom.tw/<user_name>/<repo_name>`)

```bash
docker build -t gitlab-registry.dicom.tw/a5566qq123/raccoon-dicom .
```

- 上傳 image 到 gitlab docker image registry

```bash
docker push gitlab-registry.dicom.tw/a5566qq123/raccoon-dicom
```

:::tip
其實上傳的步驟可以到 deploy -> container registry，右上角有一個 CLI Commands 可以直接複製指令喔!!
:::

