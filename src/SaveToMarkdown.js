import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { 
    WizExplorerApp as objApp,
    WizExplorerWindow as objWindow,
    WizCommonUI as objCommon,
} from './WizInterface';
import convertDocToMarkdown from './SaveToMarkdownEx';

const ValidCharSet = {
    'Unicode': 'unicode', 
    'UTF-8': 'utf-8', 
    'UTF-8 with BOM': 'utf-8-bom', 
    'GB2312': 'gb2312', 
    'GBK': 'gbk', 
    'Big5': 'big5'
};

const DocsArray = objWindow.GetHtmlDialogParam(window.WizChromeBrowser);
const progress = objApp.CreateWizObject("WizKMControls.WizProgressWindow");

function startConverterOnClick(e) {
    e.preventDefault();
    // 获取参数
    const filePath = $('#filePath').val();
    const charset = $("#othercharset-checkbox").prop('checked') ? $('#othercharset').val() : ValidCharSet[$('#charset').val()];
    // 转换数组中所有文档
    progress.Title = '另存为 Markdown';
    progress.Max = DocsArray.length - 1;
    progress.Show();
    for ( let i = 0; i < DocsArray.length; i++ ) {
        let doc = DocsArray[i];
        progress.Pos = i;
        progress.Text = `正在导出 "${doc.Title}" ...`;
        convertDocToMarkdown(doc, filePath, charset);
    }
    progress.Text = '完成！';
    progress.Destroy();
    objWindow.CloseHtmlDialog(window.WizChromeBrowser, null);
}

$(document).ready(function(){
    for ( let i = 0; i < DocsArray.length; i++ ) {
        $('#fileName').append(`<option style='overflow:hidden'>${DocsArray[i].Title}</option>`);
    }
    
    $('#chooseFilePath').on('click', function(e){
        e.preventDefault();
        const filePath = objCommon.SelectWindowsFolder('请选择要保存到的文件夹');
        $('#filePath').val(filePath);
    })

    $('#exportFile').on('click', startConverterOnClick);

    $('body').css('display', 'block');
})
