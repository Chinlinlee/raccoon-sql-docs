# Mongoose Schema
本章節在說明 Raccoon 各個 Mongoose 定義的 schema ，以及其欄位
- 各個 model 的定義可以在 `models/mongodb/models` 找到

## 基本 DICOM 定義 Schema
- raccoon 含有基本 DICOM 定義的 Schema
- 路徑: `models/mongodb/schema/dicomJsonAttribute.js`
- 除了 DA, PN, IS, TM 以外的型態都以 `string` 為主

## patient
- 路徑: `models/mongodb/models/patient.js`
- 需要儲存的欄位定義在 `models/DICOM/dicom-tags-mapping.js#tagsNeedStore` 找到
- 此 schema 設定 `strict: true` 忽略沒定義的欄位

### 定義

欄位名稱 | 別名 | 其他說明
---------|----------|---------
 patientID | | |
 studyPaths | | 紀錄 patient 所有的 studies 的資料夾相對路徑 |
 00100010 | PatientName | 
 00100020 | PatientID | 
 00100021 | IssuerOfPatientID | 
 00100030 | PatientBirthDate |
 00100032 | PatientBirthTime |
 00100040 | PatientSex |
 00101001 | OtherPatientNames |
 00101002 | OtherPatientIDsSequence |
 00102160 | EthnicGroup |
 00104000 | PatientComments|
 00880130 | StorageMediaFileSetID |
 00880140 | StorageMediaFileSetUID |

## Study
- 路徑: `models/mongodb/models/dicomStudy.js`
- 需要儲存的欄位定義在 `models/DICOM/dicom-tags-mapping.js#tagsNeedStore` 找到
- 此 schema 設定 `strict: true` 忽略沒定義的欄位

### 定義

欄位名稱 | 別名 | 其他說明
---------|----------|---------
studyUID | | |
studyPath | | study 儲存的資料夾相對路徑 |
00080005 | SpecificCharacterSet | |
00080020 | StudyDate | |
00080030 | StudyTime | |
00080050 | AccessionNumber | |
00080051 | IssuerOfAccessionNumberSequence | |
00080056 | InstanceAvailability | |
00080061 | ModalitiesInStudy | |
00080062 | SOPClassesInStudy | |
00080090 | ReferringPhysicianName | |
00080096 | ReferringPhysicianIdentificationSequence | |
0008009C | ConsultingPhysicianName | |
0008009D | ConsultingPhysicianIdentificationSequence | |
00080201 | TimezoneOffsetFromUTC | |
00081030 | StudyDescription | |
00081032 | ProcedureCodeSequence | |
00081048 | PhysiciansOfRecord | |
00081049 | PhysiciansOfRecordIdentificationSequence | |
00081060 | NameOfPhysiciansReadingStudy | |
00081062 | PhysiciansReadingStudyIdentificationSequence | |
00081110 | ReferencedStudySequence | |
00100010 | PatientName | |
00100020 | PatientID | |
00100030 | PatientBirthDate | |
00100040 | PatientSex | |
0020000D | StudyInstanceUID | |
00200010 | StudyID | |
00201206 | NumberOfStudyRelatedSeries | |
00201208 | NumberOfStudyRelatedInstances | |
00321033 | RequestingService | |
00321034 | RequestingServiceCodeSequence | |
00401012 | ReasonForPerformedProcedureCodeSequence | |
00081080 | AdmittingDiagnosesDescription | |
00081084 | AdmittingDiagnosesCodeSequence | |
00101010 | PatientAge | |
00101020 | PatientSize | |
00101021 | PatientSizeCodeSequence | |
00101022 | PatientBodyMassIndex | |
00101023 | MeasuredAPDimension | |
00101024 | MeasuredLateralDimension | |
00101030 | PatientWeight | |
00102000 | MedicalAlerts | |
00102110 | Allergies | |
001021C0 | PregnancyStatus | |
001021D0 | LastMenstrualDate | |
00380500 | PatientState | |
00102180 | Occupation | |
001021B0 | AdditionalPatientHistory | |
00380010 | AdmissionID | |
00380014 | IssuerOfAdmissionIDSequence | |
00321066 | ReasonForVisit | |
00321067 | ReasonForVisitCodeSequence | |
00380060 | ServiceEpisodeID | |
00380064 | IssuerOfServiceEpisodeIDSequence | |
00380062 | ServiceEpisodeDescription | |
00102203 | PatientSexNeutered | |
00120050 | ClinicalTrialTimePointID | |
00120051 | ClinicalTrialTimePointDescription | |
00120054 | ClinicalTrialTimePointTypeCodeSequence | |
00120052 | LongitudinalTemporalOffsetFromEvent | |
00120053 | LongitudinalTemporalEventType | |
00120083 | ConsentForClinicalTrialUseSequence | |

## Series
- 路徑: `models/mongodb/models/dicomSeries.js`
- 需要儲存的欄位定義在 `models/DICOM/dicom-tags-mapping.js#tagsNeedStore` 找到
- 此 schema 設定 `strict: true` 忽略沒定義的欄位

### 定義

欄位名稱 | 別名 | 其他說明
---------|----------|---------
studyUID | | |
seriesUID | | |
seriesPath | | Series 儲存的資料夾相對路徑 |
00080021 | SeriesDate | |
00080060 | Modality | |
0008103E | SeriesDescription | |
0008103F | SeriesDescriptionCodeSequence | |
00081050 | PerformingPhysicianName | |
00081052 | PerformingPhysicianIdentificationSequence | |
00081070 | OperatorsName | |
00081072 | OperatorIdentificationSequence | |
00081250 | RelatedSeriesSequence | |
0020000E | SeriesInstanceUID | |
00200011 | SeriesNumber | |
00400244 | PerformedProcedureStepStartDate | |
00400245 | PerformedProcedureStepStartTime | |
00400275 | RequestAttributesSequence | |
00200060 | Laterality | |
00080031 | SeriesTime | |
00181030 | ProtocolName | |
00081111 | ReferencedPerformedProcedureStepSequence | |
00180015 | BodyPartExamined | |
00185100 | PatientPosition | |
00280108 | SmallestPixelValueInSeries | |
00280109 | LargestPixelValueInSeries | |
00102210 | AnatomicalOrientationType | |
300A0700 | TreatmentSessionUID | |
00120060 | ClinicalTrialCoordinatingCenterName | |
00120071 | ClinicalTrialSeriesID | |
00120072 | ClinicalTrialSeriesDescription | |

## Instance
- 路徑: `models/mongodb/models/dicom.js`
- 需要儲存的欄位定義在 `models/DICOM/dicom-tags-mapping.js#tagsNeedStore` 找到
- 此 schema 設定 `strict: false` 允許沒定義的欄位

### 定義
- 由於 `strict` 為 false，所以有些欄位未定義，但儲存於 database 當中，且可能於程式碼有使用
- 目前情況跟沒定義一樣，後續可能需嚴謹定義 Instance 的欄位

欄位名稱 | 別名 | 其他說明
---------|----------|---------
studyUID | | |
seriesUID | | |
instanceUID | | |
00080020 | StudyDate | |
00080030 | StudyTime | |
00080050 | AccessionNumber | |
00080061 | ModalitiesInStudy | |
00080090 | ReferringPhysicianName | |
00100010 | PatientName | |
00100020 | PatientID | |
0020000D | StudyInstanceUID | |
00200010 | StudyID | |
00080060 | Modality | |
0020000E | SeriesInstanceUID | |
00200011 | SeriesNumber | |
00400244 | PerformedProcedureStepStartDate | |
00400275 | RequestAttributesSequence | |
00080016 | SOPClassUID | |
00080018 | SOPInstanceUID | |
00200013 | InstanceNumber | |

## dicomBulkData
- 路徑: `models/mongodb/models/dicomBulkData.js`
- 因為 Dicom Json 當中有 binary 的資料，可能未有 mb 級的資料，所以會提取出來，將檔案做額外儲存
- 此 schema 用於儲存 dataType 為 OW 或 OB (Binary)的相關資料

### 定義

欄位名稱 | 別名 | 其他說明
---------|----------|---------
studyUID | | |
seriesUID | | |
instanceUID | | |
filename | | binary 檔案儲存的相對路徑|
binaryValuePath | | binary 在 DICOM JSON 當中的路徑 |

## dicomToJpegTaskSchema
- 路徑: `models/mongodb/models/dicomToJpegTask.js`
- 此 schema 用於了解在上傳影像時，背景產影像的 Task 的狀態

### 定義

欄位名稱 | 別名 | 其他說明
---------|----------|---------
studyUID | | |
seriesUID | | |
instanceUID | | |
message | | <li>processing: 正在處理中</li><li>generated: 已產生完畢</li><li>error message (直接把 error 內容儲存)</li>|
status | | |