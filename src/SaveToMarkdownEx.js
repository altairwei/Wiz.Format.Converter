const html2markdown = require('./lib/html2markdown/index');
const he = require('he');
import { 
    WizExplorerWindow as objWindow,
    WizCommonUI as objCommon,
    WizAlert,
    WizBubbleMessage
} from './WizInterface';

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

export default function convertDocToMarkdown(doc, filePath, charset) {
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
        body = body.replace(/\s|&nbsp;/g, '\u0020'); // 将空格统一为转化成半角空格
        let text = html2markdown( body ); //用WizTools.dll的导出方法试一下
        // 后处理实体字符避免解析错误
        text = he.decode(text); // 处理其他实体字符
        // 导出文档
        objCommon.SaveTextToFile(destFileName, text, charset);
        objWindow.CloseHtmlDialog(window.WizChromeBrowser, null);

        return true;
    } else {
        WizBubbleMessage('转化失败', '参数不合法！');
        return false;
    }
}