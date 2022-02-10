// ==UserScript==
// @name         AWC Devtool
// @namespace    https://github.com/Zeliper/AWC_DevTool
// @updateURL    https://raw.githubusercontent.com/Zeliper/AWC_DevTool/main/AWC_DevTool.js
// @downloadURL  https://raw.githubusercontent.com/Zeliper/AWC_DevTool/main/AWC_DevTool.js
// @version      1.0
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
    //Import í  ëª¨ëë¤ì¶ê°. ìëë¡ ì¬ì©í  í¨ì êµ¬ì±
    //#################################################################################################
    unsafeWindow.getObj = (uids) => {
        if (Array.isArray(uids)){
            return unsafeWindow.AwcObjectUtil.getObjects(uids);
        }else{
            return unsafeWindow.AwcObjectUtil.getObject(uids);
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
        if (Array.isArray(props)){
            return await unsafeWindow.AwcObjectUtil.getProperties(Objs,props);
        }else{
            return await unsafeWindow.AwcObjectUtil.getProperties(Objs,[props]);
        }
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

    //#################################################################################################
    //  Prototype game~ Prototype.
    //#################################################################################################
    //#################################################################################################
    //  í¨ì ì¤ëª ë¬ë¤!
    //#################################################################################################
    unsafeWindow.helpCondition = () => {
        let msg = "\n############################[ Check Condition Help ]############################\n";
        msg    += fort("");
        msg    += fort("  =>  example 1 using CTX : ");
        msg    += fort("        checkCondition('ctx.selected != null');");
        msg    += fort("");
        msg    += fort("  =>  example 2 using data : ");
        msg    += fort("        checkCondition('data.object_name != null',DOCELEMENT);");
        msg    += fort("");
        msg    += fort("  =>  example 2 using Json : ");
        msg    += fort("        checkCondition(");
        msg    += fort("          {");
        msg    += fort("            \"$source\": \"ctx.mselected\",");
        msg    += fort("            \"$query\": {");
        msg    += fort("              \"$all\": {");
        msg    += fort("                \"$source\": \"modelType.typeHierarchyArray\",");
        msg    += fort("                \"$query\": {");
        msg    += fort("                  \"$in\": [");
        msg    += fort("                    \"Wbs0ElementCondElement\"");
        msg    += fort("                  ]");
        msg    += fort("                }");
        msg    += fort("              }");
        msg    += fort("            }");
        msg    += fort("          }");
        msg    += fort("        }");
        msg    += "#################################################################################";
        console.log(msg);
    }

    let msg = "\n###############################[ DevTool Loaded! ]###############################\n";
    msg    += fort("");
    msg    += fort("Total Loaded Module : ",LoadedModuleName.length, "  =>  'getLoadedModules' for Detail");
    msg    += fort("");
    msg    += fort("Total Failed Module : ",FailedModuleName.length, "  =>  'getFailedModules' for Detail");
    msg    += fort("");
    msg    += fort("If want to add module that you want to use in dev console");
    msg    += fort("pls add deps on kit.json");
    msg    += fort("");
    msg    += "###########################[ Custom Function Loaded! ]###########################\n";
    msg    += fort("");
    msg    += fort("getObj(uids)          =>  Get objects from uid or array of uid");
    msg    += fort("getProps(uids,props)  =>  Load propertie(s) from uid,prop string");
    msg    += fort("getData(elements)     =>  Get data(viewModel) from element(s)");
    msg    += fort("getDoc(query)         =>  Get element(s) from document query");
    msg    += fort("checkCondition(expression,dataElement = null) => Check helpCondition()")
    msg    += fort("");
    msg    += "#################################################################################";
    console.log(msg);
})();
