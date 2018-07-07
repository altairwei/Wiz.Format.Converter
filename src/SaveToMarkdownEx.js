import { 
    WizExplorerWindow as objWindow,
    WizCommonUI as objCommon,
    WizAlert,
    WizBubbleMessage
} from './WizInterface';
const html2markdown = require('./lib/html2markdown/index');
const he = require('he');

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

function wizTableToMarkdown(html) {
    //TODO: 简单表格转换成Markdown语法，复杂表格将其prettier美化后再encode
}

function embedImagesToMarkdown(destFileName, text, charset) {
    const MARKDOWN = vfile({path: destFileName, contents: text});
}

export default function convertDocToMarkdown(doc, filePath, charset, doEmbedImages) {
    const fileName = doc.Name.replace(/\.ziw$/, '');
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
        let text = html2markdown(body);
        // 最后后处理实体字符避免解析错误
        body = body.replace(/\s|&nbsp;/g, '\u0020'); // 将空格统一为转化成半角空格
        text = he.decode(text); // 处理其他实体字符
        // 导出文档
        objCommon.SaveTextToFile(destFileName, text, charset);

        // 将图片编码成base64
        /*
        if ( doEmbedImages ) {
            embedImagesToMarkdown(destFileName, text, charset);
        }
        */

        return true;
    } else {
        WizBubbleMessage('转化失败', '参数不合法！');
        return false;
    }
}