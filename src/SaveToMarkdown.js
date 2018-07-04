import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
const html2markdown = require('./lib/html2markdown/index');
const he = require('he');
import { 
    WizExplorerWindow as objWindow,
    WizCommonUI as objCommon,
    WizAlert
} from './WizInterface'

const ValidCharSet = {
    'Unicode': 'unicode', 
    'UTF-8': 'utf-8', 
    'UTF-8 with BOM': 'utf-8-bom', 
    'GB2312': 'gb2312', 
    'GBK': 'gbk', 
    'Big5': 'big5'
};

// 根据
const DocCollection = [
    objWindow.CurrentDocument
]

function wizImageToMarkdown(html) {
    const imgArray = objCommon.HtmlExtractTags(html, 'img', '', '');
    for ( imgStr of imgArray ) {
        const title = objCommon.HtmlTagGetAttributeValue(imgStr, 'title');
        const src = objCommon.HtmlTagGetAttributeValue(imgStr, 'src');
        const imgMarkdown = `![${title}](${src})`;
        const imgRegex = new RegExp(imgStr, 'g');
        html = html.replace(imgRegex, imgMarkdown)
    }
    return html;
}

function startConverterOnClick(e) {
    e.preventDefault();
    const doc = objWindow.CurrentDocument;
    $('#fileName').val(doc.Title);
    const filePath = $('#filePath').val();
    const charset = $("#othercharset-checkbox").prop('checked') ? $('#othercharset').val() : ValidCharSet[$('#charset').val()];
    convertDocToMarkdown(doc, filePath, charset);
}

function convertDocToMarkdown(doc, filePath, charset) {
    const fileName = doc.Title;
    const isMarkdown = doc.IsMarkdown();
    if (!isMarkdown) {
        WizAlert('该文档非Markdown');
        return false;
    }
    
    if (filePath && charset) {
        // 创建文件夹
        const fileFolder = filePath + fileName;
        const destFileName = filePath + fileName + '/' + fileName;
        objCommon.CreateDirectory(fileFolder);
        // 保存图片
        const ziwFileName = doc.FileName;
        objCommon.HtmlConvertZipFileToHtmlFile(ziwFileName, fileFolder + '/index.html', fileName);
        objCommon.DeletePathFile(fileFolder + '/index.html'); //删除不需要的html
        // 解析ziw
        const html = doc.GetHtml();
        let body = objCommon.HtmlExtractTags(html, 'body', '', '')[0];
        body = body.replace(/\s|&nbsp;/g, '\u0020'); // 将空格统一为转化成半角空格
        let text = html2markdown( body );
        // 后处理实体字符避免解析错误
        text = he.decode(text); // 处理其他实体字符
        // 导出文档
        objCommon.SaveTextToFile(destFileName, text, charset);
        objWindow.CloseHtmlDialog(window.WizChromeBrowser, null);
    }
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
