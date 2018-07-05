import { WizExplorerApp as objApp, WizExplorerWindow as objWindow, WizCommonUI as objCommon } from './WizInterface';
import convertDocToMarkdown from './SaveToMarkdownEx';

const ValidCharSet = {
    '0': 'unicode', 
    '1': 'utf-8', 
    '2': 'utf-8-bom', 
    '3': 'gb2312', 
    '4': 'gbk', 
    '5': 'big5'
};
const DocumentsCtrl = objWindow.DocumentsCtrl;
const selectedDocs = DocumentsCtrl.SelectedDocuments;
const progress = objApp.CreateWizObject("WizKMControls.WizProgressWindow");
const filePath = objCommon.SelectWindowsFolder('请选择要保存到的文件夹');
const charsetBoxDesc = `[0].Unicode; [1].UTF-8; [2].UTF-8 with BOM; \n[3].GB2312; [4].GBK; [5].Big5;\n或者自定义字符集_____.`;
const charset = ValidCharSet[objCommon.InputBox('请选择字符集：', charsetBoxDesc, '0')];

progress.Title = '另存为 Markdown'
progress.Max = parseInt(selectedDocs.Count) - 1;
progress.Show();
for ( let i = 0; i < selectedDocs.Count; i++ ) {
    const doc = selectedDocs.Item(i);
    progress.Pos = i;
    progress.Text = `正在导出 "${doc.Title}" ...`;
    convertDocToMarkdown(doc, filePath, charset);
}
progress.Text = '完成！';

