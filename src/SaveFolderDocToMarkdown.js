import { WizExplorerApp as objApp, WizExplorerWindow as objWindow } from './WizInterface';

const pluginPath = objApp.GetPluginPathByScriptFileName('dc_global.js');
const CategoryCtrl = objWindow.CategoryCtrl;
const selectedFolder = CategoryCtrl.SelectedFolder;
const folderDocuments = selectedFolder.Documents;
const DocsArray = [];

for ( let i = 0; i < folderDocuments.Count; i++ ) {
    const doc = folderDocuments.Item(i);
    if ( doc.IsMarkdown() ) DocsArray.push(doc);
}

objWindow.ShowHtmlDialogEx(false, '另存为 Markdown', pluginPath + 'dist/SaveToMarkdown.html', 400, 350, '', DocsArray, null);


