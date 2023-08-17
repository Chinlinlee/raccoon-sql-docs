<script>
    import { base } from "$app/paths";
</script>
# Swagger
Raccoon 使用 [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) 所提供的功能來產生 Swagger API 文檔

## 範例
- 通常我們會直接至 [Swagger Docs](https://swagger.io/docs/specification) 查看不同的 Open API 寫法
- JSDOC 會寫在 `xxxx.route.js` 當中
- 全局的 open API components 定義會放在 `docs/swagger` 當中
- 以下是 Raccoon 的其中一個 QIDO-RS 的 jsdoc 寫法

```js
/**
 *  @openapi
 *  /dicom-web/studies:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 */
router.get("/studies", validateParams(queryValidation, "query", {
    allowUnknown: true
}), require("./controller/QIDO-RS/queryAllStudies"));
```

## 產生
- Raccoon 產生 Swagger API 的腳本為 `get-swagger.js`

```bash
node get-swagger.js
```

- 執行後，產生的 Swagger API Json 檔案會在 `docs/swagger/openapi.json`

## API Docs 使用
- Raccoon 的 repo 有設定 docs 的位置，可以在 [API Documentation](https://chinlinlee.github.io/raccoon-dicom/) 找到
<div class="my-2 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 duration-300 hover:-translate-y-1 bg-transparent">
    <figure>
        <img src="{base}/swagger/swagger-ui.png" alt="Raccoon Swagger UI" class="rounded-t h-72 w-full object-cover">
        <figcaption>
            <p
                class="text-center text-sm m-1 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
                <!-- Post Title -->
                Raccoon Swagger UI
            </p>
        </figcaption>
    </figure>
</div>

- 或者你可以透過[線上 Swagger Editor 網頁](https://editor.swagger.io/)將 Swagger API 的 json 檔貼上去做測試