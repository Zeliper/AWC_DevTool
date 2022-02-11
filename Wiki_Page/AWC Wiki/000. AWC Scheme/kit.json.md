# CommandsViewModel.json

CommandsViewModel.json의 스키마 정의 입니다.

예제는 최하단에 있습니다.

<blockquote>
CommandsViewModel.json
{

<details><summary>commands : </summary><blockquote>
    
타입 : `Object <commandDef>`<br />설명 : Command의 정의 <br />필수 키 : 없음<br />
    
<details><summary>commandDef 정의</summary><blockquote>

"iconId" : `String` -> SVG 아이콘 ID [src/image] <br />
"isGroup" : `T<conditionOrBoolDef>`-> 그룹 여부 <br /> 
"title" : `String or Object` -> Command 표시 텍스트 (Object형식은 다음 파일참조 declarativeCommandsViewModelSchema-1.0.0.json)<br />
"description" : `String or Objec` -> Command 설명 텍스트 Object형식은 title설명 참조 <br />
"template" : `String` -> Command 템플릿 이름 <br />
"isShuttle" : `Boolean` -> Command 제공형식 Shuttle 여부 (OOTB 예제 없음) <br />
"isRibbon" : `Boolean` -> Command 제공형식 Ribbon 여부 (Group과 유사) <br />
"isToggle" : `Boolean` -> Toggle Command 여부 <br />
"extendedTooltip" : `Object` -> 확장 Tooltip 텍스트 <br /> 예시 <br />

```json
"extendedTooltip": {
    "view": "extendedTooltipDefault"
}
```

"selected" : `Object` -> 아직 미확인 (selected 상태일때 속성값 바뀌는걸로 추정) {<br />
&ensp;&ensp;"iconId" : "String" -> 상단의 iconId와 동일<br />
&ensp;&ensp;"title" : "String or Object" -> 상단의 title과 동일<br />
&ensp;&ensp;"description" : "String or Object" -> 상단의 description 과 동일 <br />
&ensp;&ensp;"extendedTooltip" : "Object" -> 상단의 extendedTooltip와 동일<br />
}<br />예제 <br />
    
```json
"selected": {
    "iconId": "cmdFreezeExchange",
    "title": "{{i18n.fixedLayout}}"
}
```
    
conditionOrBoolDef는 다음 두가지 케이스를 지원함<br />
```json
"isGroup" : false,
"selected" : { 
    "condition": "conditions.isCreateCommandValid"
}
```

</details>

예시
    
```json
"commands": {
        "Aw2dPageUp": {
            "iconId": "miscChevronRight",
            "title": "{{i18n.pageUp}}",
            "description": "{{i18n.Aw2dPageUpDesc}}",
            "isToggle": false
        },
        "Aw2dPageDown": {
            "iconId": "miscChevronLeft",
            "title": "{{i18n.pageDown}}",
            "description": "{{i18n.Aw2dPageDownDesc}}",
            "isToggle": false
        },
        "Aw2dPage": {
            "iconId": "cmdBlankIcon",
            "title": "{{i18n.currentPage}}",
            "template": "<div class='aw-2dviewerjs-pagenumber'>{{ctx.awTwoDViewer.currentPage}}</div>",
            "description": "{{i18n.Aw2dPageDesc}}",
            "isToggle": false
        }
}
```
        
</details>
    
<details><summary>commandHandlers : </summary><blockquote>
    
타입 : `Object <commandHandlersDef>`<br />설명 : CommandHandler 정의 하나의 Command에 여러개의 CommandHanlder를 부착할 수 있음 <br />필수 키 : `id`,`activeWhen`<br />
    
<details><summary>commandHandlersDef 정의</summary><blockquote>
    
"id" : `String` -> Handler가 제어할 Command ID <br />
"action" : `String`-> Handler의 Action  <br /> 
"activeWhen" : `T<conditionOrBoolDef>` -> Handler 동작 조건 <br />
"visibleWhen" : `T<conditionOrBoolDef>` -> Handler의 표시 조건 <br />
"selectWhen" : `T<conditionOrBoolDef>` -> Handler의 선택 조건 <br />
"enableWhen" : `T<conditionOrBoolDef>` -> Handler의 사용가능상태 조건 <br />
"openWhen" : `T<conditionOrBoolDef>` -> Group Handler의 경우 동작 조건<br />

conditionOrBoolDef는 다음 두가지 케이스를 지원함<br />
```json
"enableWhen" : false,
"visibleWhen" : { 
    "condition": "conditions.isCreateCommandValid"
}
```
    
</details>

예제

```json
"commandHandlers": {
    "createCommandHandler": {
        "id": "Awp0CreateCommand",
        "action": "createZCC",
        "activeWhen": {
            "condition": "conditions.isCreateCommandValid"
        },
        "visibleWhen": {
            "condition": "conditions.isCreateCommandValid"
        },
        "enableWhen": {
            "condition": "conditions.isCreateCommandValid"
        }
    },
    "saveAsCommandHandler": {
        "id": "Awp0SaveAsCommand",
        "action": "saveasZCC",
        "activeWhen": {
            "condition": "conditions.isSaveAsCommandValid"
        },
        "visibleWhen": {
            "condition": "conditions.isSaveAsCommandValid"
        },
        "enableWhen": true
    }
}
```
    
</details>
    
<details><summary>commandPlacements : </summary><blockquote>

타입 : `Object <commandPlacementsDef>`<br />설명 : Command의 위치 정의 <br />필수 키 : `id`<br />

<details><summary>commandPlacementsDef 정의</summary><blockquote>
    
"id" : `String` -> 위치 정의될 Command ID <br />
"parentGroupId" : `String`-> Command를 붙힐 Group Command ID  <br /> 
"uiAnchor" : `String` -> Command를 붙힐 UIAnchor ID <br />
"priority" : `Integer` -> Command 정렬 우선순위 (낮을수록 상위) <br />
"relativeTo" : `String` -> Command 상대적 정렬을 위한 기준 Command ID <br />
"showGroupSelected" : `Boolean` -> GroupCommand 플래그 <br />
"cellDisplay" : `Object` -> {<br />
&ensp;&ensp;"hover" : `Boolean` -> Cell에서 마우스 호버링시 동작여부<br />
&ensp;&ensp;"position" : `String` -> Cell에서 동작시 버튼 위치<br />
&ensp;&ensp;"selected" : `Boolean` -> Cell에서 선택했을때 동작 여부<br />}
</details>
    
예제
    
```json
"commandPlacements": {
    "Awp0CreateCommandRightWall": {
        "id": "Awp0CreateCommand",
        "uiAnchor": "aw_rightWall",
        "priority": 20,
        "parentGroupId": "Awp0NewGroup"
    },
    "Awp0saveasCommandRightWall": {
        "id": "Awp0SaveAsCommand",
        "uiAnchor": "aw_rightWall",
        "priority": 20,
        "parentGroupId": "Awp0NewGroup"
    }
}
```
    
</details>
}
