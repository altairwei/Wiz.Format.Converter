import { WizExplorerWindow as objWindow } from '../../WizInterface';
import CONST from '../../Const';

const folderDocuments = objWindow.CategoryCtrl.SelectedFolder.Documents;
const Task = [
   'SaveToMarkdown',
    []
]

for ( let i = 0; i < folderDocuments.Count; i++ ) {
    const doc = folderDocuments.Item(i);
    if ( doc.IsMarkdown() ) Task[1].push(doc);
}

objWindow.ShowHtmlDialogEx(false, '另存为 Markdown',
    CONST.ParamsDialogPath, 400, 350, '', Task, null);


