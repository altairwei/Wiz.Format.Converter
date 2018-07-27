import { WizExplorerWindow as objWindow } from '../../WizInterface';
import CONST from '../../Const';

const Task = [
    'SaveToMarkdown',
    [objWindow.CurrentDocument]
]

objWindow.ShowHtmlDialogEx(false, '另存为 Markdown',
    CONST.ParamsDialogPath, 400, 350, '', Task, null);