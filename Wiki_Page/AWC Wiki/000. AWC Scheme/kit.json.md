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
- <details><summary>ConfigurationDef 설명,</summary>

  > 타입 : `Object <ConfigurationDef>`<br />설명 : module 확장시 별도 설정 사항<br />
> ```json
{

}
```
</details>

```json
{

}
```
</details><details><summary>,</summary>

> 타입 : `String`<br />설명 : 
</details><details><summary>,</summary>

> 타입 : `String`<br />설명 : 
</details><details><summary>,</summary>

> 타입 : `String`<br />설명 : 
</details><details><summary>,</summary>

> 타입 : `String`<br />설명 : 
</details><details><summary>,</summary>

> 타입 : `String`<br />설명 : 
</details>
}
