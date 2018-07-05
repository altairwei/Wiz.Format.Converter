import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { 
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

function startConverterOnClick(e) {
    e.preventDefault();
    const doc = objWindow.CurrentDocument;
    $('#fileName').val(doc.Title);
    const filePath = $('#filePath').val();
    const charset = $("#othercharset-checkbox").prop('checked') ? $('#othercharset').val() : ValidCharSet[$('#charset').val()];
    convertDocToMarkdown(doc, filePath, charset);
}

$(document).ready(function(){
    $('#fileName').val(objWindow.CurrentDocument.Title);

    $('#chooseFilePath').on('click', function(e){
        e.preventDefault();
        const filePath = objCommon.SelectWindowsFolder('请选择要保存到的文件夹');
        $('#filePath').val(filePath);
    })

    $('#exportFile').on('click', startConverterOnClick);

    $('body').css('display', 'block');
})
