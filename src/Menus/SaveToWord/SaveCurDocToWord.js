import { WizExplorerWindow as objWindow } from '../../WizInterface';
import CONST from '../../Const';

const Task = [
    'SaveToWord',
    [objWindow.CurrentDocument]
]

objWindow.ShowHtmlDialogEx(false, '另存为 Word',
    CONST.ParamsDialogPath, 400, 350, '', Task, null);