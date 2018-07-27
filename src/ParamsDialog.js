import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { 
    WizExplorerApp as objApp,
    WizExplorerWindow as objWindow,
    WizCommonUI as objCommon,
} from './WizInterface';
import convertDocToMarkdown from './Converter/SaveToMarkdown';
import convertDocToWord from './Converter/SaveToWord';

const ValidCharSet = {
    'Unicode': 'unicode', 
    'UTF-8': 'utf-8', 
    'UTF-8 with BOM': 'utf-8-bom', 
    'GB2312': 'gb2312', 
    'GBK': 'gbk', 
    'Big5': 'big5'
};

const Task = objWindow.GetHtmlDialogParam(window.WizChromeBrowser);
const progress = objApp.CreateWizObject("WizKMControls.WizProgressWindow");

function startConverterOnClick(e) {
    const [ type, docs ] = Task;
    e.preventDefault();
    // 获取参数
    const filePath = $('#filePath').val();
    const charset = $("#othercharset-checkbox").prop('checked') ? $('#othercharset').val() : ValidCharSet[$('#charset').val()];
    // 转换数组中所有文档
    progress.Title = '另存为 Markdown';
    progress.Max = docs.length - 1;
    progress.Show();
    for ( let i = 0; i < docs.length; i++ ) {
        let doc = docs[i];
        progress.Pos = i;
        progress.Text = `正在导出 "${doc.Title}" ...`;
        switch (type) {
            case "SaveToMarkdown":
                convertDocToMarkdown(doc, filePath, charset);
                break;
            case "SaveToWord":
                convertDocToWord(doc, filePath, charset);
                break;
            default:
                throw new Error('Unknown conversion task type !');
                break;
        }
    }
    // 转换完成关闭界面
    progress.Text = '完成！';
    progress.Destroy();
    objWindow.CloseHtmlDialog(window.WizChromeBrowser, null);
}

$(document).ready(function () {
    const [ type, docs ] = Task;
    // 显示待转换文档列表
    for ( let i = 0; i < docs.length; i++ ) {
        $('#fileName').append(`<option style='overflow:hidden'>${docs[i].Title}</option>`);
    }
    
    // 绑定句柄：弹出选择目标文件夹窗口
    $('#chooseFilePath').on('click', function(e){
        e.preventDefault();
        const filePath = objCommon.SelectWindowsFolder('请选择要保存到的文件夹');
        $('#filePath').val(filePath);
    })

    // 绑定句柄：开始转换
    $('#exportFile').on('click', startConverterOnClick);

    //
    $('body').css('display', 'block');
})
