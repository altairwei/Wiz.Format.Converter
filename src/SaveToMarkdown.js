import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
const html2markdown = require('html2markdown');
const prettier = require("prettier/standalone");
const plugins = [require("prettier/parser-markdown")];

const objApp = window.external;
const objDatabase = objApp.Database;
const objWindow = objApp.Window;
const objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");
const pluginPath = objApp.GetPluginPathByScriptFileName("sm_global.js");

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
            // 创建文件夹
            const fileFolder = filePath + fileName;
            const destFileName = filePath + fileName + '/' + fileName;
            objCommon.CreateDirectory(fileFolder);
            // 保存图片
            const ziwFileName = objWindow.CurrentDocument.FileName;
            objCommon.HtmlConvertZipFileToHtmlFile(ziwFileName, fileFolder + '/index.html', fileName);
            objCommon.DeletePathFile(fileFolder + '/index.html'); //删除不需要的html
            // 保存文档
            const html = objWindow.CurrentDocument.GetHtml()
            const body = objCommon.HtmlExtractTags(html, 'body', '', '')[0];
            let text = html2markdown( body );
            //text = prettier.format(text, { parser: "markdown", plugins });
            objCommon.SaveTextToFile(destFileName, text, charset);
            objWindow.CloseHtmlDialog(window.WizChromeBrowser, null);
        }
    });

    $('body').css('display', 'block');
})
