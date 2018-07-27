import { 
    WizExplorerApp as objApp,
    WizExplorerWindow as objWindow,
    WizCommonUI as objCommon,
    WizAlert,
    WizBubbleMessage
} from '../WizInterface';

export default function convertDocToWord(doc, filePath, charset) {
    const fileName = doc.Name.replace(/\.ziw$/, '');
    const isMarkdown = doc.IsMarkdown();
    const isMathJax = doc.IsMathJax();
    if (!isMarkdown) {
        WizAlert('该文档非Markdown');
        return false;
    }

    if (filePath && charset) {
        let flags = 0x4000 | 0x20000;
        if ( isMarkdown || isMathJax ) {
            flags |= 0x200 | 0x400;
        }
        // 创建文件夹
        const fileFolder = filePath + fileName;
        const destFileName = fileFolder + '/' + fileName + '.html';
        objCommon.CreateDirectory(fileFolder);
        //
        doc.SaveToHtml(destFileName, flags);
        const text = objCommon.LoadTextFromFile(destFileName);
        objCommon.DeletePathFile(destFileName);
        objCommon.SaveTextToFile(destFileName, text, 'utf-8');
        // 失败
        //const objWord = objApp.CreateActiveXObject("SharePoint.OpenDocuments.2");
        //objWord.ViewDocument(destFileName);
        //alert(destFileName);
        // 通过cmd用特殊的宏来打开word，然后另存为docx
        // 或者写vbs脚本，用Word.Apllication控件来保存

        return true;
    } else {
        WizBubbleMessage('转化失败', '参数不合法！');
        return false;
    }
}