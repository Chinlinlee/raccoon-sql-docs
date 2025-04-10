<script>
    import { base } from "$app/paths";
    import CenterImage from "@raccoon-docs/core/src/components/CenterImage.svelte";

    let host = "{host}";
    let pageUrl = process.env.VERSION_PAGE_BASE_URL;
</script>

# HL7 Server 插件

此插件會啟動一個 HL7 Server，可接收 HL7 以下種類的 Message
- `ADT` Type 且 event 為 `A04` (Register a patient) 和 `A08` (Update patient information) 
- `ORM` Type 且 event 為 `O01` (Order message)
- `OMI` Type 且 event 為 `O23` (Imaging order)

## 設定檔
- 請修改 `plugins/config.js`
```js
module.exports.pluginsConfig = {
    // 省略...
    // 加入以下內容
    hl7Server: {
        enable: true,
        before: true,
        routers: [],
        port: 8787 // 啟動 hl7 server 的 port
    }
};
```

## 使用方法
- 在進行 HL7 插件測試前，請先安裝 [HAPI HL7 Test panel](https://sourceforge.net/projects/hl7api/files/hapi-testpanel/2.0.1/)
  - 注意，HAPI HL7 Test panel 需要使用到 JDK 1.8

### 使用 HL7 Test panel 傳送建立 Patient 的訊息

1. 開啟 HAPI HL7 Test panel
2. Sending Connections 新增關於 HL7 Server 的連線，在這裡 HL7 Server 的 port 為 8787

<CenterImage
src="{base}/plugin-list/hl7-server/sending-connections.png"
alt="Sending Connections Page"
title="Sending Connections Page">
</CenterImage>

3. 切換至 Messages，新增一筆 ADT^A04 的訊息

```
MSH|^~\&|ADT1|MCM|LABADT|MCM|198808181126|SECURITY|ADT^A04|MSG00001|P|2.4
EVN|A01-|198808181123
PID|||PATID1234^5^M11||JONES^WILLIAM^A^III||19610615|M-||2106-3|1200 N ELM STREET^^GREENSBORO^NC^27401-1020|GL|(919)379-1212|(919)271-3434~(919)277-3114||S||PATID12345001^2^M10|123456789|9-87654^NC
NK1|1|JONES^BARBARA^K|SPO|||||20011105
NK1|1|JONES^MICHAEL^A|FTH
PV1|1|I|2000^2012^01||||004777^LEBAUER^SIDNEY^J.|||SUR||-||1|A0-
AL1|1||^PENICILLIN||PRODUCES HIVES~RASH
AL1|2||^CAT DANDER
DG1|001|I9|1550|MAL NEO LIVER, PRIMARY|19880501103005|F||
PR1|2234|M11|111^CODE151|COMMON PROCEDURES|198809081123
ROL|45^RECORDER^ROLE MASTER LIST|AD|CP|KATE^SMITH^ELLEN|199505011201
GT1|1122|1519|BILL^GATES^A
IN1|001|A357|1234|BCMD|||||132987
IN2|ID1551001|SSN12345678
ROL|45^RECORDER^ROLE MASTER LIST|AD|CP|KATE^ELLEN|199505011201
```

<CenterImage
    src="{base}/plugin-list/hl7-server/ADT-A04-message.png"
    alt="ADT^A04 Message"
    title="ADT^A04 Message">
</CenterImage>

4. 點擊 `Send` 按鈕，將訊息傳送至 HL7 Server
5. 傳送成功後，正常可以看到 response 的訊息 (MSA 為 `AA` 則代表過程中沒出錯)

<CenterImage
    src="{base}/plugin-list/hl7-server/ADT-A04-result.png"
    alt="ADT^A04 Result"
    title="ADT^A04 Result">
</CenterImage>

6. 在創建後，可以至 SQL 的 `patient` 資料表中，看到剛剛建立的 Patient 資料

### 使用 HL7 Test panel 傳送建立 MWL 的訊息

步驟與建立 Patient 的訊息相同，只是將訊息改為 OMI^O23 的訊息

```
MSH|^~\&|MESA_OF|XYZ_RADIOLOGY|MESA_IM|XYZ_IMAGE_MANAGER|20220324193155||OMI^O23^OMI_O23|1001125|P|2.5.1||||||8859/1
PID|||PATID1234^5^M11||JONES^WILLIAM^A^III||19610615|M-||2106-3|1200 N ELM STREET^^GREENSBORO^NC^27401-1020|GL|(919)379-1212|(919)271-3434~(919)277-3114||S||PATID12345001^2^M10|123456789|9-87654^NC
NTE|||PatientComments
PV1||E||||||^ReferringPhysicianFN^ReferringPhysicianGN^ReferringPhysicianMN^^DR^Md|||||||B6||||AdmissionIDFromVisitNo||||||||||||||||||||||||||||||||V
ORC|NW|PlacerOrderNumberImagingServiceRequest|FillerOrderNumberImagingServiceRequest||SC||^^^^^RequestedProcedurePriority||||||||||HospID_1^Hospital1^CCN|||||InstitutionAddress
TQ1|||||||20000816151000||T
OBR||PlacerOrderNumberImagingServiceRequest|FillerOrderNumberImagingServiceRequest|10637-7^Microscopic Observation^LN||||||||PatientState|MedicalAlerts|||^RequestingPhysicianFN^RequestingPhysicianGN^RequestingPhysicianMN^^DR^Md||||||||||||||PatientTransportArrangements|D1304^Rheumatoid, other arthritis with motor score from 12 –35.,comorbidity in tier 3^HIPPS|||ScheduledPerformingPhysicianNameFN^20250410121212^20250410121414^^DR^Md||||||||||10637-7^Microscopic Observation^LN
OBX|1|ST|^Body Weight||65|kg|||||F
OBX|2|ST|^Body Height||1.65|m|||||F
NTE|||RequestedProcedureComments
IPC|ACC-shi3Ub|RP-chaeF9|1.2.392.200036.9125.0.198811291108.7|SPS-johs4U|CT|10637-7^Microscopic Observation^LN|ScheduledStationName|ScheduledProcStepLocation|ScheduledStationAET1~ScheduledStationAET2
```

- 在創建後可以在 SQL 的 `mwl_item` 資料表中，看到剛剛建立的 MWL 資料


