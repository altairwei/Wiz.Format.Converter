// 浏览器对象
var objApp = window.external;
var objDatabase = objApp.Database;
var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");
var objWindow = objApp.Window;
var pluginPath = objApp.GetPluginPathByScriptFileName("dc_global.js");

// 创建原型

class PandocTask {
    constructor(toFile, fromFile) {
        // fromFile, toFile 都是一个对象，包含完整路径文件名和文件类型；
        // 判断一些必要的全局对象
        if (!objApp) throw new Error('IWizExplorerApp is not valid.');
        if (!objWindow) throw new Error('IWizExplorerWindow is not valid.');
        if (!objCommon) throw new Error('IWizCommonUI is not valid.');
        // 默认fromFile为当前HTML页面
        fromFile = fromFile ? fromFile : {
            fileName : this._createTempFile(objWindow.CurrentDocument),
        };
    };

    _createTempFile(doc, type) {
        // doc 为IWizDocument对象
        let tempFileName = '';
        type = type ? type : doc.IsMarkdown() ? 'markdown' : 'html';
        switch (type) {
            case 'markdown':
                tempFileName = objCommon.GetATempFileName('.md');
                let tempMarkdownText = doc.GetText(0);
                objCommon.SaveTextToFile(tempFileName, tempMarkdownText, 'Unicode');
                break;
            case 'html':
                let TemporaryFolder = objCommon.GetSpecialFolder('TemporaryFolder');
                tempFileName = `${TemporaryFolder}${doc.GUID}/128/index.htm`;
                break;
        }
        
        return tempFileName;
    };
}

// 封装 Wiznote APIs




// 测试Pandoc
(function testPandoc() {
    let pandocFileName = pluginPath + 'lib/pandoc/pandoc.exe';
    // 注意“My Knowlege”文件夹名称中有空格，会被pandoc误认为分隔符，所以在整个路径名两端加引号。
    let params = `-f markdown -t html -o "${pluginPath}output.html" "${pluginPath}test.md"`;
    //let ret = objCommon.RunExe2(true, pandocFileName, '-v', true);
    //alert(ret);
    let WshShell = objApp.CreateActiveXObject("WScript.Shell");
    let objExec = WshShell.Exec(`${pandocFileName} -h`);
    alert(objExec.StdOut.ReadAll());
})();