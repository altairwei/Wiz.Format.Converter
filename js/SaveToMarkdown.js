var objApp = window.external;
var objDatabase = objApp.Database;
var objWindow = objApp.Window;
var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");
var pluginPath = objApp.GetPluginPathByScriptFileName("sm_global.js");

const ValidCharSet = {
    'Unicode': 'unicode', 
    'UTF-8': 'utf-8', 
    'UTF-8 with BOM': 'utf-8-bom', 
    'GB2312': 'gb2312', 
    'GBK': 'gbk', 
    'Big5': 'big5'
};

function WizAlert(msg) {
    objWindow.ShowMessage(msg, "{p}", 0x00000040);
}

function WizConfirm(msg) {
    return objWindow.ShowMessage(msg, "{p}", 0x00000020 | 0x00000001) == 1;
}

$(document).ready(function(){

    $('#fileName').val(objWindow.CurrentDocument.Title);

    $('#chooseFilePath').on('click', function(e){
        e.preventDefault();
        const filePath = objCommon.SelectWindowsFolder('请选择要保存到的文件夹');
        $('#filePath').val(filePath);
    })

    $('#exportFile').on('click', function(e){
        e.preventDefault();
        const isMarkdown = objWindow.CurrentDocument.IsMarkdown();
        if (!isMarkdown) {
            WizAlert('该文档非Markdown');
            return false;
        }
        const fileName = $('#fileName').val();
        const filePath = $('#filePath').val();
        const charset = $("#othercharset-checkbox").prop('checked') ? $('#othercharset').val() : ValidCharSet[$('#charset').val()];
        
        if (filePath && fileName && charset) {
            const text = objWindow.CurrentDocument.GetText(0x0000);
            objCommon.SaveTextToFile(filePath + fileName, text, charset);
            objWindow.CloseHtmlDialog(window.WizChromeBrowser, null);
        }
    })
})
