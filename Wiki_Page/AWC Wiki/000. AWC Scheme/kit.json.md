# kit.json

모듈 또는 공통 solution에 있는 kit.json의 내부 스키마 분석 및 작성 방법에 대해서 기술합니다.

`kit.json`

{
<details><summary>name,</summary>

> 타입 : `String`<br />설명 : 킷,모듈의 명칭
</details>
<details><summary>author,</summary>

> 타입 : `String`<br />설명 : 소유자
</details><details><summary>srcDir,</summary>

> 타입 : `String`<br />설명 : 소스 디렉터리 Default값은 `src_kit`
</details><details><summary>srcModule,</summary>

> 타입 : `String`<br />설명 : Source .War파일 Default값은 `fx-appbase`
</details><details><summary>zipFile,</summary>

> 타입 : `String`<br />설명 : Staging 폴더 zip파일 경로
</details><details><summary>level,</summary>

> 타입 : `Integer`<br />설명 : kit 계층 레벨 0에 가까울수록 Base (OOTB등)
</details><details><summary>skipSonar,</summary>

> 타입 : `Boolean`<br />설명 : kit의 Sonar generation 무시 플레그 Default값은 `true`
</details><details><summary>enableWhenToVisibleWhen,</summary>

> 타입 : `Boolean`<br />설명 : 스키마 설명이 없음
</details><details><summary>kitDeps,</summary>

> 타입 : `String[]`<br />설명 : kit 종속성 목록 <br />
```json
"kitDeps": [
    "change",
    "capa",
    "tc-aw-solution"
]
```
</details><details><summary>kitMap,</summary>

> 타입 : `Object`<br />설명 : 지원되지않음 (Deprecated)
</details><details><summary>soaDeps,</summary>

> 타입 : `String[]`<br />키 사용시 최소 배열 개수 : `1`<br />설명 : 해당 kit에서 사용할 Soa Dependency 목록 <br /> 만약 Soa API목록에서 찾아서 Soa를 Post했을때 404에러가 날 경우 여기에 추가 후 사용<br />
```json
"soaDeps": [
  "Teamcenter.Soa.Administration.PreferenceManagement",
  "Teamcenter.Soa.BusinessModeler",
  "Teamcenter.Soa.AuthorizedDataAccess",
  "Teamcenter.Soa.Administration",
  "Awp0.Soa.AWS2",
  "Aut0.Soa.Security"
]
```
</details><details><summary>extraDeps,</summary>

> 타입 : `String[]`<br />키 사용시 최소 배열 개수 : `1`<br />설명 : webpack 빌드시에 강제로 Include할 kit Dependency 목록입니다.
</details><details><summary>karmaKitDeps,</summary>

> 타입 : `String[]`<br />키 사용시 최소 배열 개수 : `1`<br />설명 : kit 구동 테스트시에 필요한 kit 목록
</details><details><summary>modules,</summary>

> 타입 : `String`<br />키 사용시 최소 배열 개수 : `0`<br />설명 : kit 빌드시 포함할 module 목록
</details><details><summary>configuration,</summary>

> 타입 : `Object <ConfigurationDef>`<br />설명 : module 확장시 별도 설정 사항

```json
"configuration": {
    "actionTemplateDefs": {
        "output": "json",
        "definition": "module"
    },
    "adapters": {
        "output": "javascript",
        "format": "array",
        "definition": "module"
    },
    "aliasRegistry": {
        "output": "json",
        "definition": "module"
    }
}
```
    
- <details><summary>ConfigurationDef 설명,</summary>
    
  > 타입 : `Object`<br />설명 : configuration에서 사용될 Object형식<br />
    
    ```json
    "key" : {
        "output" : "json | javascript",
        "format" : "array | object",
        "definition" : "module | kit",
        "multiple" : Boolean,
        "uniqueDepth" : Integer
    }
    ```

</details></details><details><summary>solutionDef,</summary>

> 타입 : `Object`<br />설명 : 솔루션 정의<br />
```json
"solutionDef": {
        "solutionId": "test-solution",
        "solutionName": "test-solution",
        "solutionVersion": "",
        "browserTitle": "",
        "brandName": "",
        "companyName": "Siemens PLM Software",
        "copyrightText": "Copyright © 2019 Siemens Product Lifecycle Management Software Inc.",
        "workspaces": [],
        "authenticator": "",
        "defaultWorkspace": ""
}
```
    
> 키,값 설명
    
`solutionID : String`<br />
    > 솔루션 고유 명칭
    
`brandName : String`<br />
    > 솔루션 소유 회사 명
    
`solutionName : String`<br />
    > 솔루션 이름
    
`solutionVersion : String`<br />
    > 솔루션 버전
    
`copyrightText : String`<br />
    > 저작권 표기
    
`companyName : String`<br />
    > 상호
    
`solutionWar : String`<br />
    > war 파일 명
    
`workspaces : String`<br />
    > 솔루션 내 정의된 Workspace 이름
    
`defaultWorkspace : String`<br />
    > 솔루션 기본 Workspace [war 내부에 Workspace가 정의되어 있어야함]
    
`clipboard : String`<br />
    > 솔루션 클립보드 서비스 파일
    
`authenticator : String`<br />
    > 솔루션 유저 인증 서비스
    
`analytics : String`<br />
    > Backend 분석 서비스 (로깅)
    
`defaultTheme : "ui-lightTheme | ui-darkTheme"`<br />
    > 솔루션 기본 테마
    
`commandVisibility : String`<br />
    > 커맨드 Visibility 처리 서비스 이름
    
`bundler : String`<br />
    > 번들러 설정<br />
    
    
    "bundler": {
      "entryFiles": [
        "tc.html"
      ]
    }
    
`required : String[]`<br />
    > Dependency 목록
    
    "required": [
        "solutionId",
        "brandName",
        "solutionName",
        "solutionVersion",
        "browserTitle",
        "companyName",
        "copyrightText"
    ]
    
</details><details><summary>bundles,</summary>

> 타입 : `Object`<br />설명 : 번들화 시에 일부만 로드하고싶은경우 (required 포함) 리스트 <br />
    
- <details><summary>Object 키 목록</summary>
    
    ``` json
    "번들명" : { 
        "include" : "String[]",
        "deps" : "String[]",
        "exclude" : "String[]",
        "optimize" : "String[]",
        "allowSourceOverwrites" : "Boolean",
        "preserveLicenseComments" : "Boolean",
        "generateSourceMaps" : "Boolean"
    }
    ```
    
```json
"bundles" : {
    "js/hostintegration.bundle.js": {
      "deps": [
        "js/bootstrap"
      ],
      "include": [
        "js/adobeHostingService",
        "js/hosting/inf/services/hostClientInfo_2019_05",
        "js/hosting/inf/services/hostSelection_2019_05",
        "js/hosting/inf/services/hostTheme_2019_05",
        "js/hosting/sol/services/hostQuery_2019_05",
        "js/hostMentorQueryService",
        "js/hostVisQueryService",
        "js/hostShapeSearchQueryService",
        "js/hostedNxUtils"
      ]
    },
    "": {
      "optimize": "uglify2",
      "allowSourceOverwrites": false,
      "preserveLicenseComments": false,
      "generateSourceMaps": true
    },
    "lib/noty/jquery.noty.js": {
      "name": "lib/noty/jquery.noty"
    }
}
```
    
</details>
</details><details><summary>ignoreMissingKits,</summary>

> 타입 : `Boolean`<br />설명 : 빌드시 누락 Kit 무시 설정
</details><details><summary>OOTB,</summary>

> 타입 : `Boolean`<br />설명 : OOTB 플래그
</details>
}
