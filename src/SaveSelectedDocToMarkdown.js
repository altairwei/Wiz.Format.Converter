import { WizExplorerApp as objApp, WizExplorerWindow as objWindow } from './WizInterface';

const pluginPath = objApp.GetPluginPathByScriptFileName('dc_global.js');
const DocumentsCtrl = objWindow.DocumentsCtrl;
const selectedDocs = DocumentsCtrl.SelectedDocuments;
const DocsArray = [];

for ( let i = 0; i < selectedDocs.Count; i++ ) {
    const doc = selectedDocs.Item(i);
    DocsArray.push(doc);
}

objWindow.ShowHtmlDialogEx(false, '另存为 Markdown', pluginPath + 'dist/SaveToMarkdown.html', 400, 350, '', DocsArray, null);


