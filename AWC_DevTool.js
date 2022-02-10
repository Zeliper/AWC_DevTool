// ==UserScript==
// @name         AWC Devtool
// @namespace    https://github.com/Zeliper/AWC_DevTool
// @updateURL    https://github.com/Zeliper/AWC_DevTool/raw/main/AWC_DevTool.js
// @downloadURL  https://github.com/Zeliper/AWC_DevTool/raw/main/AWC_DevTool.js
// @version      1.2
// @description  Based On AWC 6.0 & TC13.3
// @author       Oh Seung Woo
// @match        localhost
// @include      https://qps-detest.singlex.com/
// @include      https://qps-dev.singlex.com/
// @include      lgsp
// @icon         <$ICON$>
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
/*
* === Change Log ===
*
* 2022.02.10 : 1.1 -> 1.2 마무리 작업
*     Single Query 추가
*     Load 완료 메세지 정리 및 도움말 함수 추가
*
* 2022.02.10 : 0.1 -> 1.1 정식 버전 업데이트
*     AwcObjectUtil 종속성 제거 (OOTB 모듈 사용으로 교체)
*     Build시 bundle화 된 소스코드 로드 가능하게 로직 변경
*/
unsafeWindow.on = true;
(async function() {
    'use strict';
    let LoadedModuleName = [];
    let FailedModuleName = [];
    let InitModules = async (_ModuleNames,AdditionalFunction) => {
        for(let _module of _ModuleNames){
            try{
                if(unsafeWindow.afxWeakImport(_module.deps)){
                    unsafeWindow[_module.name] = unsafeWindow.afxWeakImport(_module.deps);
                    LoadedModuleName.push(_module.name);
                }else{
                    FailedModuleName.push(_module.name);
                }
            }catch(e){
                FailedModuleName.push(_module.name);
            }
        }
        AdditionalFunction();
    }

    function httpGet( theUrl ) {
        return new Promise( ( resolve, reject ) => {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if( xmlHttp.readyState === 4 && xmlHttp.status === 200 ) {
                    resolve( xmlHttp.responseText );
                }
            };

            xmlHttp.onerror = function( e ) {
                reject( e );
            };

            xmlHttp.open( 'GET', theUrl, true ); // true for asynchronous
            xmlHttp.send( null );
        } );
    }
    let configSvc;
    let __CfgSvc = await unsafeWindow.afxDynamicImport(['js/configurationService'],(e)=>configSvc = e);
    let baseUrl = configSvc.config.baseUrl;
    let jsString = await httpGet(baseUrl + "/js/afxImport.js");
    let modules = jsString.split(`require.cache[require.resolveWeak('`).filter(e=>e.split(`//`).length < 2).map(e=>e.split(`')]`)[0]);
	let jsons = modules.filter(e=>e.split(".directive").length <2).filter(e=>e.split(".controller").length <2).filter(e => e);
    let Modules = [];
    for(let json of jsons){
        let name = json;
        if(json.split("js/").length > 2){
            name = json.split("js/")[1]
        }
        let modulePath = json;
        if(name.split(".service").length >1){
            name = name.split(".service")[0];
        }
        if(name.split("/").length > 1){
            name = name.split("/")[name.split("/").length -1];
        }

        Modules.push({deps : modulePath, name : name});
    }
    await InitModules(Modules,()=>{
		unsafeWindow.ctx = unsafeWindow.appCtxService.ctx;
	});

    unsafeWindow.getLoadedModules = LoadedModuleName;
    unsafeWindow.getFailedModules = FailedModuleName;
    let fort = (...args) => {
        let msg = "#  ";
        for(let m of args){
            msg += m;
        }
        msg+= " ".repeat(80-msg.length) + "#\n";
        return msg;
    }
    //#################################################################################################
    // Automation 함수
    //#################################################################################################
    unsafeWindow.getObj = (uids) => {
        if (Array.isArray(uids)){
            return unsafeWindow.clientDataModel.getObjects(uids);
        }else{
            return unsafeWindow.clientDataModel.getObject(uids);
        }
    }
    unsafeWindow.getProps = async (uids,props) => {
        let IUids = [];
        let Objs = [];
        if (Array.isArray(uids)){
            if(typeof uids[0] == "string"){
                Objs = unsafeWindow.getObj(uids);
            }else{
                Objs = uids;
            }
        }else{
            if(typeof uids == "string"){
                Objs.push(unsafeWindow.getObj(uids));
            }else{
                Objs.push(uids);
            }
        }
        if (!Array.isArray(props)){
            props = [props];
        }
        let soaInputParam = {
          objects: Objs,
          attributes: props
        }
	return soaService.post( 'Core-2006-03-DataManagement', 'getProperties', soaInputParam );
    }
    unsafeWindow.getData = (elements) =>{
        if(Array.isArray(elements)){
            let outData = [];
            for(let element of elements){
                outData.push(unsafeWindow.viewModelService.getViewModelUsingElement(element));
            }
            return outData;
        }else{
            return unsafeWindow.viewModelService.getViewModelUsingElement(elements);
        }
    }
    unsafeWindow.getDoc = (query) =>{
        let docs = document.querySelectorAll(query);
        if(docs.length > 1){
            return docs;
        }
        else if (docs.length == 1){
            return docs[0];
        }else{
            return null;
        }
    }
    unsafeWindow.checkCondition = (expression,dataElement = null) =>{
        let declViewModel = {};
        declViewModel.data = unsafeWindow.getData(dataElement);
        declViewModel.ctx = unsafeWindow.ctx;
        let scope = unsafeWindow.angular.element(dataElement);
        return unsafeWindow.conditionService.evaluateCondition(declViewModel,expression);
    }
    unsafeWindow.q = (query) => {
        return unsafeWindow.document.querySelector(query);
    }

    //#################################################################################################
    //  설명서 추가
    //#################################################################################################
    let loadSuccess = () => {
      let msg = "\n###############################[ DevTool Loaded! ]###############################\n";
      msg    += fort("");
      msg    += fort("Total Loaded Module : ",LoadedModuleName.length, "  =>  'getLoadedModules' for Detail");
      msg    += fort("");
      msg    += fort("Total Failed Module : ",FailedModuleName.length, "  =>  'getFailedModules' for Detail");
      msg    += fort("");
      msg    += fort("Type 'devtoolHelp()' for more Information");
      msg    += fort("");
      msg    += "#################################################################################";
      console.log(msg);
    }
    unsafeWindow.helpCondition = () => {
        let msg = "\n#############################[ Check Condition Help ]############################\n";
        msg    += fort("");
        msg    += fort("  =>  example 1 using CTX : ");
        msg    += fort("        checkCondition('ctx.selected != null');");
        msg    += fort("");
        msg    += fort("  =>  example 2 using data : ");
        msg    += fort("        checkCondition('data.object_name != null',DOCELEMENT);");
        msg    += fort("");
        msg    += fort("  =>  example 2 using Json : ");
        msg    += fort("        checkCondition({");
        msg    += fort("          \"$source\": \"ctx.mselected\",");
        msg    += fort("          \"$query\": {");
        msg    += fort("            \"$all\": {");
        msg    += fort("              \"$source\": \"modelType.typeHierarchyArray\",");
        msg    += fort("              \"$query\": {");
        msg    += fort("                \"$in\": [");
        msg    += fort("                  \"Wbs0ElementCondElement\"");
        msg    += fort("                ]");
        msg    += fort("              }");
        msg    += fort("            }");
        msg    += fort("          }");
        msg    += fort("        }");
        msg    += fort("      );");
        msg    += fort("");
        msg    += "#################################################################################";
        console.log(msg);
    }
    unsafeWindow.devtoolHelp = () => {
      let msg = "\n################################[ DevTool Help ]#################################\n";
      msg    += fort("");
      msg    += fort("If want to add module that you want to use in dev console");
      msg    += fort("pls add deps on kit.json");
      msg    += fort("");
      msg    += "#################################################################################\n";
      msg    += fort("");
      msg    += fort("getObj(uids)          =>  Get objects from uid or array of uid");
      msg    += fort("getProps(uids,props)  =>  Load propertie(s) from uid,prop string");
      msg    += fort("getData(elements)     =>  Get data(viewModel) from element(s)");
      msg    += fort("getDoc(query)         =>  Get element(s) from document query");
      msg    += fort("q(query)              =>  Single select document query");
      msg    += fort("checkCondition(expression,dataElement = null) => Check helpCondition()")
      msg    += fort("");
      msg    += "#################################################################################";
      console.log(msg);
    }
    loadSuccess();
})();
