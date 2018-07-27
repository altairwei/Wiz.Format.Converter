import { WizExplorerWindow as objWindow } from '../../WizInterface';
import CONST from '../../Const';

const selectedDocs = objWindow.DocumentsCtrl.SelectedDocuments;
const Task = [
    'SaveToMarkdown',
    []
]

for ( let i = 0; i < selectedDocs.Count; i++ ) {
    const doc = selectedDocs.Item(i);
    Task[1].push(doc);
}

objWindow.ShowHtmlDialogEx(false, '另存为 Markdown',
    CONST.ParamsDialogPath, 400, 350, '', Task, null);


